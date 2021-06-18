let ban = document.getElementById("field");
let tarn_msg = document.getElementById("tarn");
let turn = 1;
tarn_msg.textContent = "○から始めてください";
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
          console.log(data)
          for(let i =0 ; i< 9 ; i++){
            if(data[i]!=0){
              ban_set();   
          }
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
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      switch (ban_ar[x][y]) {
        case 0:
          stone = "";
          break;
        case -1:
          stone = "⚪";
          break;
        case 1:
          stone = "×";
          break;
      }
      ban.rows[0].cells[0].innerText = 'マル';
    }
  }
  return true;
}
