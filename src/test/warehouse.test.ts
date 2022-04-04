import {Namespace} from '../namespace';
import {Warehouse} from '../warehouse';
import {Registry} from '../registry';
import {
    IllegalNamespaceLabelException,
    IllegalPathException,
    NamespaceNotFoundException,
    PathExceptedException,
    PathNotAllowedException
} from '../exception';

interface DatabaseConfig {
    username: string,
    password: string,
    port: number
}

interface MockConfig {
    isDebug: boolean,
    resourceDir: string,
    maxConnection: number,

    database: DatabaseConfig
}

describe('namespace basic tests', function () {
    const namespace = new Namespace<MockConfig>({
        isDebug: true,
        resourceDir: '../resource',
        maxConnection: 100
    });

    namespace.set('maxConnection', 50);

    it('should be correct values', function () {
        expect(namespace.get('isDebug')).toEqual(true);
        expect(namespace.get('resourceDir')).toEqual('../resource');
        expect(namespace.get('maxConnection')).toEqual(50);
    });

    it('should be deleted', function () {
        namespace.delete('resourceDir');
        expect(namespace.get('resourceDir')).toBeUndefined();
    });
});

describe('namespace exception tests', function () {
    const namespace = new Namespace<MockConfig>();

    it('should throw illegal path exception', function () {
        expect(() => {
            namespace.set('database/username', 'shotgun');
        }).toThrow(IllegalPathException);
    });
});

describe('warehouse basic tests', function () {
    let warehouse =
        new Warehouse<MockConfig>()
            .set('isDebug', true)
            .set('resourceDir', '../resource')
            .set<MockConfig, 'maxConnection'>('maxConnection', 100);

    it('should be true', function () {
        expect(warehouse.get('isDebug')).toEqual(true);
    });

    warehouse = new Warehouse({
        defaultNamespace: 'root'
    }).merge<MockConfig>({
        isDebug: true,
        resourceDir: '../resource',
        maxConnection: 100
    });

    it('should be 100', function () {
        expect(warehouse.get<MockConfig>('maxConnection')).toEqual(100);
    });

    it('should throw illegal namespace label exception', function () {
        expect(() => {
            warehouse.createNamespace('me?fool');
        }).toThrow(IllegalNamespaceLabelException);
    });

    it('should throw namespace not found exception', function () {
        expect(() => {
            warehouse.getNamespace('yourNamespace');
        }).toThrow(NamespaceNotFoundException);
    });
});

describe('warehouse two namespaces', function () {
    const warehouse = new Warehouse();
    warehouse.createNamespace<MockConfig>('myNamespace');

    warehouse.merge({
        isDebug: true,
        resourceDir: '../resource',
        maxConnection: 100
    });

    warehouse.merge<MockConfig>({
        isDebug: false
    }, 'myNamespace');

    warehouse.set('myNamespace:resourceDir', '../public/resource');

    it('should be correct value', function () {
        expect(warehouse.get('myNamespace:isDebug')).toEqual(false);
        expect(warehouse.get('myNamespace:resourceDir')).toEqual('../public/resource');
        expect(warehouse.get('myNamespace:maxConnection')).toBeUndefined();
    });
});

describe('deeply merge tests', function () {
    const warehouse = new Warehouse<MockConfig>();

    warehouse.deepMerge({
        database: {
            username: 'shotgun',
            password: 'admin',
            port: 3306
        }
    });

    it('should be correct value', function () {
        expect(warehouse.get('database.username')).toEqual('shotgun');
        expect(warehouse.get('database.password')).toEqual('admin');
        expect(warehouse.get('database.port')).toEqual(3306);
    });
});

describe('registry basic tests', function () {
    const warehouse = new Warehouse<MockConfig>();
    const myNamespace = warehouse.createNamespace<MockConfig>('myNamespace');
    const registry = new Registry(warehouse.getNamespace());
    registry.pushNamespace(myNamespace);

    warehouse.merge({
        isDebug: true,
        resourceDir: '../resource',
        maxConnection: 100
    });

    warehouse.merge({
        isDebug: false
    }, 'myNamespace');

    warehouse.deepMerge({
        maxConnection: 50,
        database: {
            username: 'shotgun',
            password: 'admin',
            port: 3306
        }
    }, 'myNamespace');

    registry.allowPaths(['isDebug', 'resourceDir', 'maxConnection', 'database.username']);

    it('should be correct value', function () {
        expect(registry.get('resourceDir')).toEqual('../resource');

        expect(registry.get('isDebug')).toEqual(false);
        expect(registry.get('maxConnection')).toEqual(50);

        expect(registry.get('database.username')).toEqual('shotgun');
    });

    it('should throw path not allowed exception', function () {
        expect(() => {
            registry.get('database.password');
        }).toThrow(PathNotAllowedException);
    });

    it('should throw path excepted exception', function () {
        registry.allowAllPaths().exceptPaths(['database.port']);
        expect(() => {
            registry.get('database.port');
        }).toThrow(PathExceptedException);
    });

    it('should be undefined', function () {
        registry.allowAllPaths();
        expect(registry.get('database.url')).toBeUndefined();
    });
});
