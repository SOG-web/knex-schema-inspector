import Knex from 'knex';
import { expect } from 'chai';
import schemaInspector from '../lib';
import { SchemaInspector } from '../lib/types/schema-inspector';

describe('mssql', () => {
  let database: Knex;
  let inspector: SchemaInspector;

  before(() => {
    database = Knex({
      client: 'mssql',
      connection: {
        host: '127.0.0.1',
        port: 1433,
        user: 'SA',
        password: 'Test@123',
        database: 'test_db',
        charset: 'utf8',
      },
    });
    inspector = schemaInspector(database);
  });

  after(async () => {
    await database.destroy();
  });

  describe('.tables', () => {
    it('returns tables', async () => {
      expect(await inspector.tables()).to.deep.equal([
        'teams',
        'users',
        'page_visits',
      ]);
    });
  });

  describe('.tableInfo', () => {
    it('returns information for all tables', async () => {
      expect(await inspector.tableInfo()).to.deep.equal([
        {
          name: 'teams',
          schema: 'dbo',
          catalog: 'test_db',
        },
        {
          name: 'users',
          schema: 'dbo',
          catalog: 'test_db',
        },
        {
          name: 'page_visits',
          schema: 'dbo',
          catalog: 'test_db',
        },
      ]);
    });

    it('returns information for specific table', async () => {
      expect(await inspector.tableInfo('teams')).to.deep.equal({
        name: 'teams',
        schema: 'dbo',
        catalog: 'test_db',
      });
    });
  });

  describe('.hasTable', () => {
    it('returns if table exists or not', async () => {
      expect(await inspector.hasTable('teams')).to.equal(true);
      expect(await inspector.hasTable('foobar')).to.equal(false);
    });
  });

  describe('.columns', () => {
    it('returns information for all tables', async () => {
      expect(await inspector.columns()).to.deep.equal([
        { table: 'teams', column: 'activated_at' },
        { table: 'teams', column: 'created_at' },
        { table: 'teams', column: 'credits' },
        { table: 'teams', column: 'description' },
        { table: 'teams', column: 'id' },
        { table: 'teams', column: 'name' },
        { table: 'teams', column: 'uuid' },
        { table: 'users', column: 'email' },
        { table: 'users', column: 'id' },
        { table: 'users', column: 'password' },
        { table: 'users', column: 'team_id' },
        { table: 'page_visits', column: 'created_at' },
        { table: 'page_visits', column: 'request_path' },
        { table: 'page_visits', column: 'user_agent' },
      ]);
    });

    it('returns information for specific table', async () => {
      expect(await inspector.columns('teams')).to.deep.equal([
        { column: 'id', table: 'teams' },
        { column: 'uuid', table: 'teams' },
        { column: 'name', table: 'teams' },
        { column: 'description', table: 'teams' },
        { column: 'credits', table: 'teams' },
        { column: 'created_at', table: 'teams' },
        { column: 'activated_at', table: 'teams' },
      ]);
    });
  });

  describe('.columnInfo', () => {
    it('returns information for all columns in all tables', async () => {
      expect(await inspector.columnInfo()).to.deep.equal([
        {
          name: 'id',
          table: 'teams',
          data_type: 'int',
          default_value: null,
          max_length: null,
          numeric_precision: 10,
          numeric_scale: 0,
          is_nullable: false,
          is_unique: false,
          is_primary_key: true,
          has_auto_increment: true,
          foreign_key_column: 'id',
          foreign_key_table: 'teams',
        },
        {
          name: 'uuid',
          table: 'teams',
          data_type: 'char',
          default_value: null,
          max_length: 36,
          numeric_precision: null,
          numeric_scale: null,
          is_nullable: false,
          is_unique: true,
          is_primary_key: false,
          has_auto_increment: false,
          foreign_key_column: 'uuid',
          foreign_key_table: 'teams',
        },
        {
          name: 'name',
          table: 'teams',
          data_type: 'varchar',
          default_value: null,
          max_length: 100,
          numeric_precision: null,
          numeric_scale: null,
          is_nullable: true,
          is_unique: false,
          is_primary_key: false,
          has_auto_increment: false,
          foreign_key_column: null,
          foreign_key_table: null,
        },
        {
          name: 'description',
          table: 'teams',
          data_type: 'varchar',
          default_value: null,
          max_length: -1,
          numeric_precision: null,
          numeric_scale: null,
          is_nullable: true,
          is_unique: false,
          is_primary_key: false,
          has_auto_increment: false,
          foreign_key_column: null,
          foreign_key_table: null,
        },
        {
          name: 'credits',
          table: 'teams',
          data_type: 'int',
          default_value: null,
          max_length: null,
          numeric_precision: 10,
          numeric_scale: 0,
          is_nullable: true,
          is_unique: false,
          is_primary_key: false,
          has_auto_increment: false,
          foreign_key_column: null,
          foreign_key_table: null,
        },
        {
          name: 'created_at',
          table: 'teams',
          data_type: 'datetime2',
          default_value: null,
          max_length: null,
          numeric_precision: null,
          numeric_scale: null,
          is_nullable: true,
          is_unique: false,
          is_primary_key: false,
          has_auto_increment: false,
          foreign_key_column: null,
          foreign_key_table: null,
        },
        {
          name: 'activated_at',
          table: 'teams',
          data_type: 'date',
          default_value: null,
          max_length: null,
          numeric_precision: null,
          numeric_scale: null,
          is_nullable: true,
          is_unique: false,
          is_primary_key: false,
          has_auto_increment: false,
          foreign_key_column: null,
          foreign_key_table: null,
        },
        {
          name: 'id',
          table: 'users',
          data_type: 'int',
          default_value: null,
          max_length: null,
          numeric_precision: 10,
          numeric_scale: 0,
          is_nullable: false,
          is_unique: false,
          is_primary_key: true,
          has_auto_increment: true,
          foreign_key_column: 'id',
          foreign_key_table: 'users',
        },
        {
          name: 'team_id',
          table: 'users',
          data_type: 'int',
          default_value: null,
          max_length: null,
          numeric_precision: 10,
          numeric_scale: 0,
          is_nullable: false,
          is_unique: false,
          is_primary_key: false,
          has_auto_increment: false,
          foreign_key_column: 'team_id',
          foreign_key_table: 'users',
        },
        {
          name: 'email',
          table: 'users',
          data_type: 'varchar',
          default_value: null,
          max_length: 100,
          numeric_precision: null,
          numeric_scale: null,
          is_nullable: true,
          is_unique: false,
          is_primary_key: false,
          has_auto_increment: false,
          foreign_key_column: null,
          foreign_key_table: null,
        },
        {
          name: 'password',
          table: 'users',
          data_type: 'varchar',
          default_value: null,
          max_length: 60,
          numeric_precision: null,
          numeric_scale: null,
          is_nullable: true,
          is_unique: false,
          is_primary_key: false,
          has_auto_increment: false,
          foreign_key_column: null,
          foreign_key_table: null,
        },
        {
          name: 'request_path',
          table: 'page_visits',
          data_type: 'varchar',
          default_value: null,
          max_length: 100,
          numeric_precision: null,
          numeric_scale: null,
          is_nullable: true,
          is_unique: false,
          is_primary_key: false,
          has_auto_increment: false,
          foreign_key_column: null,
          foreign_key_table: null,
        },
        {
          name: 'user_agent',
          table: 'page_visits',
          data_type: 'varchar',
          default_value: null,
          max_length: 200,
          numeric_precision: null,
          numeric_scale: null,
          is_nullable: true,
          is_unique: false,
          is_primary_key: false,
          has_auto_increment: false,
          foreign_key_column: null,
          foreign_key_table: null,
        },
        {
          name: 'created_at',
          table: 'page_visits',
          data_type: 'datetime2',
          default_value: null,
          max_length: null,
          numeric_precision: null,
          numeric_scale: null,
          is_nullable: true,
          is_unique: false,
          is_primary_key: false,
          has_auto_increment: false,
          foreign_key_column: null,
          foreign_key_table: null,
        },
      ]);
    });
    it('returns information for all columns in specific table', async () => {
      expect(await inspector.columnInfo('teams')).to.deep.equal([
        {
          name: 'id',
          table: 'teams',
          data_type: 'int',
          default_value: null,
          max_length: null,
          numeric_precision: 10,
          numeric_scale: 0,
          is_nullable: false,
          is_unique: false,
          is_primary_key: true,
          has_auto_increment: true,
          foreign_key_column: 'id',
          foreign_key_table: 'teams',
        },
        {
          name: 'uuid',
          table: 'teams',
          data_type: 'char',
          default_value: null,
          max_length: 36,
          numeric_precision: null,
          numeric_scale: null,
          is_nullable: false,
          is_unique: true,
          is_primary_key: false,
          has_auto_increment: false,
          foreign_key_column: 'uuid',
          foreign_key_table: 'teams',
        },
        {
          name: 'name',
          table: 'teams',
          data_type: 'varchar',
          default_value: null,
          max_length: 100,
          numeric_precision: null,
          numeric_scale: null,
          is_nullable: true,
          is_unique: false,
          is_primary_key: false,
          has_auto_increment: false,
          foreign_key_column: null,
          foreign_key_table: null,
        },
        {
          name: 'description',
          table: 'teams',
          data_type: 'varchar',
          default_value: null,
          max_length: -1,
          numeric_precision: null,
          numeric_scale: null,
          is_nullable: true,
          is_unique: false,
          is_primary_key: false,
          has_auto_increment: false,
          foreign_key_column: null,
          foreign_key_table: null,
        },
        {
          name: 'credits',
          table: 'teams',
          data_type: 'int',
          default_value: null,
          max_length: null,
          numeric_precision: 10,
          numeric_scale: 0,
          is_nullable: true,
          is_unique: false,
          is_primary_key: false,
          has_auto_increment: false,
          foreign_key_column: null,
          foreign_key_table: null,
        },
        {
          name: 'created_at',
          table: 'teams',
          data_type: 'datetime2',
          default_value: null,
          max_length: null,
          numeric_precision: null,
          numeric_scale: null,
          is_nullable: true,
          is_unique: false,
          is_primary_key: false,
          has_auto_increment: false,
          foreign_key_column: null,
          foreign_key_table: null,
        },
        {
          name: 'activated_at',
          table: 'teams',
          data_type: 'date',
          default_value: null,
          max_length: null,
          numeric_precision: null,
          numeric_scale: null,
          is_nullable: true,
          is_unique: false,
          is_primary_key: false,
          has_auto_increment: false,
          foreign_key_column: null,
          foreign_key_table: null,
        },
      ]);
    });
    it('returns information for a specific column in a specific table', async () => {
      expect(await inspector.columnInfo('teams', 'uuid')).to.deep.equal({
        name: 'uuid',
        table: 'teams',
        data_type: 'char',
        default_value: null,
        max_length: 36,
        numeric_precision: null,
        numeric_scale: null,
        is_nullable: false,
        is_unique: true,
        is_primary_key: false,
        has_auto_increment: false,
        foreign_key_column: 'uuid',
        foreign_key_table: 'teams',
      });
    });
  });

  describe('.primary', () => {
    it('returns primary key for a table', async () => {
      expect(await inspector.primary('teams')).to.equal('id');
      expect(await inspector.primary('page_visits')).to.equal(null);
    });
  });
});
