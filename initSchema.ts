import { getDbClient } from './getDbClient'

const client = getDbClient()

async function createSchema() {
  try {
    await client.connect()

    // Define your schema creation query here
    const schemaQuery = `
      CREATE TABLE IF NOT EXISTS assets (
        uuid UUID PRIMARY KEY,
        name VARCHAR(100),
        content TEXT,
        type VARCHAR(20),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await client.query(schemaQuery)
    console.log('Executed query:', schemaQuery)

    console.log('Schema creation completed successfully!')
  } catch (error) {
    console.error('Error creating schema:', error)
  } finally {
    await client.end()
  }
}

createSchema()
