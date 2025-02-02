import postgres from 'postgres';


const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });


// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getEvents() {
    await sql`
        SELECT *
        FROM calendar-entries
    `
}