import db from '../middleware/database';

export class BaseModel {
  protected static tableName: string;
  
  // Get all records
  static async findAll() {
    return await db(this.tableName).select('*');
  }
  
  // Find by ID
  static async findById(id: string | number) {
    const result = await db(this.tableName).where('id', id).first();
    return result || null;
  }
  
  // Find by condition
  static async findBy(conditions: Record<string, any>) {
    const result = await db(this.tableName).where(conditions).first();
    return result || null;
  }
  
  // Find multiple by condition
  static async findAllBy(conditions: Record<string, any>) {
    return await db(this.tableName).where(conditions);
  }
  
  // Create new record
  static async create(data: Record<string, any>) {
    const [id] = await db(this.tableName).insert(data);
    return await this.findById(id);
  }
  
  // Update record
  static async update(id: string | number, data: Record<string, any>) {
    await db(this.tableName).where('id', id).update({
      ...data,
      updated_at: new Date()
    });
    return await this.findById(id);
  }
  
  // Delete record
  static async delete(id: string | number) {
    const record = await this.findById(id);
    if (record) {
      await db(this.tableName).where('id', id).del();
    }
    return record;
  }
  
  // Count records
  static async count(conditions?: Record<string, any>) {
    const query = db(this.tableName);
    if (conditions) {
      query.where(conditions);
    }
    const result = await query.count('* as count').first();
    return result?.count || 0;
  }
  
  // Raw query helper
  static async query(sql: string, bindings?: any[]) {
    if (bindings) {
      return await db.raw(sql, bindings);
    }
    return await db.raw(sql);
  }
}

export default BaseModel;
