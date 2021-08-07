import {
    START_NODE_ROW,
    START_NODE_COL,
    FINISH_NODE_ROW,
    FINISH_NODE_COL,
    NODES_ROWS,
    NODES_COLS,
} from "../../helpers/helper";

const handleCheck = (node) => {
    return node.row === FINISH_NODE_ROW && node.col === FINISH_NODE_COL;
}

// let graph = {}
//
// for (let i = 0; i < NODES_ROWS; i++) {
//     for (let j = 0; j < NODES_COLS; j++) {
//         graph[i * NODES_COLS + j] = nodes[i][j];
//     }
// }
const sortArrayByDistance = arr => {
    arr.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

export const BFS = state => {
    const nodes = state.nodes;
    const animations = [];

    const queue = [nodes[START_NODE_ROW][START_NODE_COL]];
    let backtrackNode = null;

    while (queue.length) {
        const current_node = queue[0];
        queue.shift();

        if (!current_node.isVisited && !current_node.isWall) {
            const row = current_node.row, col = current_node.col;
            animations.push([row, col]);
            current_node.isVisited = true;

            if (handleCheck(current_node)) {
                backtrackNode = current_node;
                break;
            }

            if (row > 0) {
                if (!nodes[row - 1][col].isVisited) {
                    nodes[row - 1][col].previousNode = current_node;
                    queue.push(nodes[row - 1][col]);
                }
            }

            if (col < NODES_COLS - 1) {
                if (!nodes[row][col + 1].isVisited) {
                    nodes[row][col + 1].previousNode = current_node;
                    queue.push(nodes[row][col + 1]);
                }
            }

            if (row < NODES_ROWS - 1) {
                if (!nodes[row + 1][col].isVisited) {
                    nodes[row + 1][col].previousNode = current_node;
                    queue.push(nodes[row + 1][col]);
                }
            }

            if (col > 0) {
                if (!nodes[row][col - 1].isVisited) {
                    nodes[row][col - 1].previousNode = current_node;
                    queue.push(nodes[row][col - 1]);
                }
            }
        }
    }

    const backtrack = [];

    if (backtrackNode) {
        while (backtrackNode.row !== START_NODE_ROW || backtrackNode.col !== START_NODE_COL) {
            backtrack.unshift([backtrackNode.row, backtrackNode.col]);
            backtrackNode = backtrackNode.previousNode;
        }
    }

    return [animations, backtrack];
}

export const DFS = state => {
    const nodes = state.nodes;
    const animations = [];

    let stack = [nodes[START_NODE_ROW][START_NODE_COL]];
    let backtrackNode = null;

    while (stack.length) {
        const current_node = stack.pop();

        if (!current_node.isVisited && !current_node.isWall) {
            const row = current_node.row, col = current_node.col;
            animations.push([row, col]);
            current_node.isVisited = true;

            if (handleCheck(current_node)) {
                backtrackNode = current_node;
                break;
            }

            if (col > 0) {
                if (!nodes[row][col - 1].isVisited) {
                    nodes[row][col - 1].previousNode = current_node;
                    stack.push(nodes[row][col - 1]);
                }
            }

            if (row < NODES_ROWS - 1) {
                if (!nodes[row + 1][col].isVisited) {
                    nodes[row + 1][col].previousNode = current_node;
                    stack.push(nodes[row + 1][col]);
                }
            }

            if (col < NODES_COLS - 1) {
                if (!nodes[row][col + 1].isVisited) {
                    nodes[row][col + 1].previousNode = current_node;
                    stack.push(nodes[row][col + 1]);
                }
            }

            if (row > 0) {
                if (!nodes[row - 1][col].isVisited) {
                    nodes[row - 1][col].previousNode = current_node;
                    stack.push(nodes[row - 1][col]);
                }
            }
        }
    }

    const backtrack = [];

    if (backtrackNode) {
        while (backtrackNode.row !== START_NODE_ROW || backtrackNode.col !== START_NODE_COL) {
            backtrack.unshift([backtrackNode.row, backtrackNode.col]);
            backtrackNode = backtrackNode.previousNode;
        }
    }

    return [animations, backtrack];
}

export const ASTAR = state => {
    const nodes = state.nodes;

    for (let i = 0; i < NODES_ROWS; i++) {
        for (let j = 0; j < NODES_COLS; j++) {
            nodes[i][j].distance = Math.sqrt(Math.pow(i - FINISH_NODE_ROW, 2) + Math.pow(j - FINISH_NODE_COL, 2));
        }
    }

    const animations = []

    let stack = [nodes[START_NODE_ROW][START_NODE_COL]];
    let backtrackNode = null;

    while (stack.length) {
        const current_node = stack.shift();

        if (!current_node.isVisited && !current_node.isWall) {
            const row = current_node.row, col = current_node.col;
            animations.push([row, col]);
            current_node.isVisited = true;

            if (handleCheck(current_node)) {
                backtrackNode = current_node;
                break;
            }

            if (col > 0) {
                if (!nodes[row][col - 1].isVisited) {
                    nodes[row][col - 1].previousNode = current_node;
                    stack.push(nodes[row][col - 1]);
                }
            }

            if (row < NODES_ROWS - 1) {
                if (!nodes[row + 1][col].isVisited) {
                    nodes[row + 1][col].previousNode = current_node;
                    stack.push(nodes[row + 1][col]);
                }
            }

            if (col < NODES_COLS - 1) {
                if (!nodes[row][col + 1].isVisited) {
                    nodes[row][col + 1].previousNode = current_node;
                    stack.push(nodes[row][col + 1]);
                }
            }

            if (row > 0) {
                if (!nodes[row - 1][col].isVisited) {
                    nodes[row - 1][col].previousNode = current_node;
                    stack.push(nodes[row - 1][col]);
                }
            }
        }

        sortArrayByDistance(stack);
    }

    const backtrack = [];

    if (backtrackNode) {
        while (backtrackNode.row !== START_NODE_ROW || backtrackNode.col !== START_NODE_COL) {
            backtrack.unshift([backtrackNode.row, backtrackNode.col]);
            backtrackNode = backtrackNode.previousNode;
        }
    }

    return [animations, backtrack];
}
