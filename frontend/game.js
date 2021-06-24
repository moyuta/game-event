let ban = document.getElementById("field");
let tarn_msg = document.getElementById("tarn");
let turn = 1;
let flags;
tarn_msg.textContent = "○✖︎ゲーム";
let ban_ar = new Array(3);
for (let x = 0; x < ban_ar.length; x++) {
  ban_ar[x] = new Array(3);
}

ban_new();
function ban_new() {
  for (let x = 0; x < 3; x++) {
    let tr = document.createElement("tr");
    ban.appendChild(tr);
    for (let y = 0; y < 3; y++) {
      let td = document.createElement("td");
      tr.appendChild(td);
    }
  }
  $.ajax({
    type: "POST",
    url: "/first",
    data: JSON.stringify({ s: "start" }),
  })
    .done(function (data) {
      if (data) {
        ban_ar = JSON.parse(data);
        ban_set();
      }
    })
    //↓フォームの送信に失敗した場合の処理
    .fail(function () {
      alert("error");
    });
}

// // クリックした時に実行されるイベント
for (let x = 0; x < 3; x++) {
  for (let y = 0; y < 3; y++) {
    let click_osero = ban.rows[x].cells[y];
    click_osero.onclick = function () {
      $.ajax({
        type: "POST",
        url: "/click",
        data: JSON.stringify({
          x: this.cellIndex,
          y: this.parentNode.rowIndex,
        }),
      })
        .done(function (data) {
          let datas = JSON.parse(data);
          ban_ar = datas[0];
          flags = datas[1];
          ban_set();
        })
        //↓フォームの送信に失敗した場合の処理
        .fail(function () {
          alert("error");
        });
    };
  }
}
function ban_set() {
  let stone = "";
  const bans = ban_ar;
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      switch (bans[x][y]) {
        case 0:
          stone = "";
          break;
        case -1:
          stone = "×";
          break;
        case 1:
          stone = "○";
          break;
      }
      ban.rows[x].cells[y].innerText = stone;
    }
  }
  setTimeout(function () {
    if (flags == 1) {
      alert("○の勝利です");
      location.reload();
    } else if (flags == -1) {
      alert("×の勝利です");
      location.reload();
    } else if (flags == 0) {
      alert("引き分けです");
      location.reload();
    }
  }, 100);
}
