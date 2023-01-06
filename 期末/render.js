export function layout(title, content) {
    return `
    <html>
    <head>
      <title>${title}</title>
      <style>
      .Base {
        width: 150px;
        height: 50px;
        margin: 10px 0 10px 500px;
        padding: 10px 35px 10px 35px;
        border-radius: 2px;
        box-shadow: 2px 2px 0 0 rgba(157, 139, 127, 0.25);
        background-color: #e79324f5;
        color: white;
        text-align: center;
        ;
    }
    
    .BG-Copy {
        margin: 10px 40px 10px 10px;
        padding: 10px 5px 10px 5px;
        border-color: #2f3944;
    }
    
    table {
        border: 2px solid #2f3944;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        font-size: 16px;
        text-align: center;
        border-collapse: collapse;
    }
    
    th {
        background-color: #e79324f5;
        border: 1px solid #2f3944;
        color: #fff;
    }
    
    td {
        border: 1px solid #2f3944;
    }
    
    tr {
        height: 60px;
    }
      </style>
    </head>
    <body>
      <section id="content">
        ${content}
      </section>
    </body>
    </html>
    `
}

export function list(comments) {
    let list = []
    for (let comment of comments) {
        list.push(`
      <tr>
        <td><h2>${comment.content}</h2></td>
        <td>${comment.createdAt}</td>
        <td><p><a href="/comment/${comment.id}">Read post</a></p>
        <p><a href="/remove/${comment.id}">Remove post</a></p></td>
      </tr>
      `)
    }
    let content = `
    <a href="/comment/new">Create new comment</a>
    <table width="800px" align="center" id='Feedback_table'>
    <tr>
    <th width="30%">留言時間</th>
    <th width="30%">留言內容</th>
    <th width="10%"></th>
    </tr>
    ${list.join('\n')}
    </table>
    `
    return layout('Comments', content)
}

export function newcomment() {
    return layout('New Post', `
    <p>寫下你的留言。</p>
    <br>
    <form action="/comment" method="post">
    <br>
    <TEXTAREA NAME="content" id="content" ROWS="8" COLS="80" placeholder="想寫甚麼留言都可以" class="BG-Copy"
    style="border:2px #a8ce20 solid;"></TEXTAREA>
    <br>
    <INPUT TYPE="submit" VALUE="發佈" class="Base" style='text-align:"right"'>
    </form>
    <hr>
    <br>
    <CAPTION>
    <h2><strong>我的留言紀錄</strong></h2>
    </CAPTION>
    `)
}

export function show(post) {
    return layout(post.content, `
    <a href="/">Back to home</a>
      <h1>${post.content}</h1>
      <p>${post.createdAt}</p>
    `)
}
