//参考
//https://qiita.com/POPOPON/items/edc7a522d2ee9a50cc3a
//https://chaika.hatenablog.com/entry/2019/11/30/090000
//https://tech-blog.s-yoshiki.com/entry/183/
async function BFS_start() {
    var BFS_array = maze_array.slice();
    var BFS_check = [];
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    var BFS_ctx;
    var BFS_maze = document.querySelector("canvas");
    var BFS_step = BFS_maze.height / BFS_array[0].length;
    BFS_ctx = BFS_maze.getContext("2d");

    const start = [1, 1];
    const goal = [BFS_array[0].length - 2, BFS_array[0].length - 2];
    console.log(goal)
    const d = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    const que = [];
    que.push(start);
    BFS_array[1][1] = 1;

    for (let i = 0; i < BFS_array[0].length; i++) {
        var tmp = [];
        for (let j = 0; j < BFS_array[0].length; j++) {
            tmp.push(0);
        }
        BFS_check.push(tmp);
    }

    while (que.length > 0) {
        const p = que.shift();
        // ゴールに到着しているならbreak
        if (p[0] == goal[0] & p[1] == goal[1]) {
            break;
        }
        // 右、下、左、上の順でチェック
        for (let i = 0; i < d.length; i++) {
            const next_x = p[0] + d[i][0];
            const next_y = p[1] + d[i][1];
            // はみ出し、壁衝突を考慮する
            if (BFS_array[next_x][next_y] == 1) continue;

            // 新しいポジションへの移動は現地点への最短経路+1となる
            que.push([next_x, next_y]);
            BFS_check[next_x][next_y] = BFS_check[p[0]][p[1]] + 1
            BFS_array[next_x][next_y] = 1

            BFS_ctx.fillStyle = "#7fffd4";
            await sleep(0);
            BFS_ctx.fillRect(next_x * BFS_step, next_y * BFS_step, BFS_step, BFS_step);
        }
    }
    BFS_ctx.fillStyle = "yellow";
    BFS_ctx.fillRect((BFS_array.length - 2) * BFS_step,(BFS_array.length - 2)  * BFS_step, BFS_step, BFS_step);
    console.log(BFS_check)

    const que_ans = [];
    que_ans.push(goal)

    while (que_ans.length > 0) {
        const ans_p = que_ans.shift();

        if (ans_p[0] == 1 & ans_p == 1) {
            break;
        }

        for (let i = 0; i < d.length; i++) {
            const ans_next_x = ans_p[0] + d[i][0];
            const ans_next_y = ans_p[1] + d[i][1];

            if (BFS_check[ans_next_x][ans_next_y] == 0) continue;
            if (BFS_check[ans_p[0]][ans_p[1]] - BFS_check[ans_next_x][ans_next_y] != 1) continue;

            que_ans.push([ans_next_x, ans_next_y]);

            BFS_ctx.fillStyle = "red";
            await sleep(0);
            BFS_ctx.fillRect(ans_next_x * BFS_step, ans_next_y * BFS_step , BFS_step, BFS_step);




        }
    }
}
