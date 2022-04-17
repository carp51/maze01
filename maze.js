//参考　https://note.com/yusaku/n/n45c4487f5e62
var maze_array = [];
function start() {
    maze_array = [];
    var ctx;
    var maze = document.querySelector("canvas");
    var count = document.getElementById("count").value;
    if (count % 2 == 0) {
        count = Number(count) + 1;
    }
    console.log(count);
    let step = maze.width / count;
    function init() {
        ctx = maze.getContext("2d");
        ctx.clearRect(0, 0, maze.width, maze.height);
        ctx.fillStyle = "gray";
        ctx.fillRect(0, 0, maze.height, maze.height);
    }

    function render() {
        for (let i = 0; i < maze.width / step; i++) {
            for (let j = 0; j < maze.height / step; j++) {
                if (maze_array[i][j] == 1) {
                    ctx.fillStyle = "black";
                    ctx.fillRect(i * step, j * step, step, step);
                } else if (i == 1 & j == 1 || i == count - 2 & j == count - 2) {
                    ctx.fillStyle = "yellow";
                    ctx.fillRect(i * step, j * step, step, step);
                }

            }
        }
    }

    for (let i = 0; i < maze.width / step; i++) {
        var tmp = [];
        for (let j = 0; j < maze.height / step; j++) {
            tmp.push(0);
        }
        maze_array.push(tmp);
    }

    function random(arr) {
        array = arr;
        newArray = [];

        while (array.length > 0) {
            n = array.length;
            k = Math.floor(Math.random() * n);

            newArray.push(array[k]);
            array.splice(k, 1);
        }

        return newArray[0]
    }
    function maze_create() {
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
                if (i == 0 || j == 0 || i == count - 1 || j == count - 1) {
                    maze_array[i][j] = 1;
                } else if (i % 2 == 0 & j % 2 == 0) {
                    maze_array[i][j] = 1;
                    var flag = true;
                    while (flag) {
                        let tmp_i = i;
                        let tmp_j = j;
                        var random_num = [1, 2, 3, 4];
                        if (i != 2) {
                            delete random_num[0];
                        }
                        let num = random(random_num);
                        if (num == 1) {
                            tmp_i -= 1;
                        } else if (num == 2) {
                            tmp_j += 1;
                        } else if (num == 3) {
                            tmp_i += 1;
                        } else if (num == 4) {
                            tmp_j -= 1;
                        }
                        if (maze_array[tmp_i][tmp_j] == 0) {
                            maze_array[tmp_i][tmp_j] = 1;
                            flag = false;
                        }
                    }
                }
            }

        }
    }
maze_create();
init();
render();
console.log(maze_array);
}
