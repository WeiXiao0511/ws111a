import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import * as render from './render.js'
import { DB } from "https://deno.land/x/sqlite/mod.ts";

const db = new DB("website.db");
db.query("CREATE TABLE IF NOT EXISTS comment (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP)");

const router = new Router();

router.get('/', list)
  .get('/comment/new', add)
  .get('/remove/:id', remove)
  .get('/comment/:id', show)
  .post('/comment', create);

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

function query(sql) {
  let list = []
  for (const [id, content, createdAt] of db.query(sql)) {
    list.push({id, content, createdAt})
  }
  return list
}

async function list(ctx) {
  let comment = query("SELECT * FROM comment")
  console.log('list:comment=', comment)
  ctx.response.body = await render.list(comment);
}

async function add(ctx) {
  ctx.response.body = await render.newcomment();
}

async function remove(ctx) {
  db.query(`DELETE FROM comment WHERE id=${ctx.params.id}`);
  ctx.response.redirect("/");
}

async function show(ctx) {
  const pid = ctx.params.id;
  let comments = query(`SELECT * FROM comment WHERE id=${pid}`)
  let comment = comments[0]
  console.log('show:comment=', comment)
  if (!comment) ctx.throw(404, 'invalid comment id');
  ctx.response.body = await render.show(comment);
}

async function create(ctx) {
  const body = ctx.request.body()
  if (body.type === "form") {
    const pairs = await body.value
    const comment = {}
    for (const [key, value] of pairs) {
      comment[key] = value
    }
    console.log('create:comment=', comment)
    db.query("INSERT INTO comment (content) VALUES (?)", [comment.content]);
    ctx.response.redirect('/');
  }
}

console.log('Server run at http://127.0.0.1:8000')
await app.listen({ port: 8000 });
