import './PathFindingVisualizer.scss';

import Node from "./node/Node"
import React, { Component } from "react";
import { BFS, DFS, ASTAR } from "./algorithms/PathFindingAlgorithms";
import {
    algorithms,
    START_NODE_ROW,
    START_NODE_COL,
    FINISH_NODE_ROW,
    FINISH_NODE_COL,
    NODES_ROWS,
    NODES_COLS,
} from "../helpers/helper"

export default class PathFinderVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
            algorithm: algorithms.DEFAULT,
            mousePressed: false,
            start: [START_NODE_ROW, START_NODE_COL],
            finish: [FINISH_NODE_ROW, FINISH_NODE_COL],
        };
    }

    componentDidMount() {
        this.setState({nodes: getInitialNodes()});
    }

    handleMouseDown(row, col) {
        this.setState({
            grid: getNewGridWithWallToggled(this.state.nodes, row, col),
            mousePressed: true,
        })
    }

    handleMouseEnter(row, col) {
        if (this.state.mousePressed) {
            this.setState({
                grid: getNewGridWithWallToggled(this.state.nodes, row, col),
            });
        }
    }

    handleMouseUp() {
        this.setState({
            mousePressed: false,
        });
    }

    bfs() {
        const animations = BFS(this.state);

        return animations;
    }

    dfs() {
        const animations = DFS(this.state);

        return animations;
    }

    a_star() {
        const animations = ASTAR(this.state);

        return animations;
    }

    djikstra() {
        const animations = BFS(this.state);

        return animations;
    }

    begin() {
        let animations = [];

        switch (this.state.algorithm) {
            case algorithms.BFS:
                animations = this.bfs();
                break;
            case algorithms.DFS:
                animations = this.dfs();
                break;
            case algorithms.ASTAR:
                animations = this.a_star();
                break;
            case algorithms.DIJKSTRA:
                animations = this.dijkstra();
                break;
            case algorithms.DEFAULT:
                break;
            default:
                break;
        }

        for (let i = 0; i < animations[0].length; i++) {
            setTimeout(() => {
                const [ row, col ] = animations[0][i];
                document.getElementById(`node-${row}-${col}`).classList.add("node-visited");
            }, i * 10);
        }

        for (let i = 0; i < animations[1].length; i++) {
            setTimeout(() => {
                const [ row, col ] = animations[1][i];
                document.getElementById(`node-${row}-${col}`).classList.add("node-path");
            }, (animations[0].length * 10) + i * 10);
        }
    }

    render() {
        const { nodes, mouseIsPressed } = this.state;

        return (
            <div className="visualizer">
                <div className="buttons">
                    <button
                        onClick={() => {
                            this.setState({algorithm: algorithms.BFS});
                        }}
                    >
                        Breadth First Search
                    </button>
                    <button
                        onClick={() => {
                            this.setState({algorithm: algorithms.DFS});
                        }}
                    >
                        Depth First Search
                    </button>
                    <button
                        onClick={() => {
                            this.setState({algorithm: algorithms.ASTAR});
                        }}
                    >
                        A*
                    </button>
                    <button
                        onClick={() => {
                            this.setState({algorithm: algorithms.DIJKSTRA});
                        }}
                    >
                        Dijkstra
                    </button>
                </div>
                <div className="buttons">
                    <button
                        onClick={() => {
                            this.begin();
                        }}
                    >
                        Begin
                    </button>
                    <button
                        onClick={() =>  window.location.reload(false)}
                    >
                        Reset
                    </button>
                </div>
                <div className="grid">
                    {nodes.map((currRows, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {currRows.map((node, nodeIdx) => {
                                    const { isStart, isFinish, isVisited, isWall } = node;

                                    return (
                                        <Node
                                            key={nodeIdx}
                                            row={rowIdx}
                                            col={nodeIdx}
                                            isStart={isStart}
                                            isFinish={isFinish}
                                            isVisited={isVisited}
                                            isWall={isWall}
                                            mouseIsPressed={mouseIsPressed}
                                            onMouseDown={(rowIdx, nodeIdx) => {
                                                this.handleMouseDown(rowIdx, nodeIdx);
                                            }}
                                            onMouseEnter={(rowIdx, nodeIdx) => {
                                                this.handleMouseEnter(rowIdx, nodeIdx);
                                            }}
                                            onMouseUp={() => this.handleMouseUp()}
                                        />
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        )
    }
}

const getInitialNodes = () => {
    const nodes = [];

    for (let i = 0; i < NODES_ROWS; i++) {
        const row = [];

        for (let j = 0; j < NODES_COLS; j++) {
            row.push(createNode(i, j));
        }

        nodes.push(row);
    }

    return nodes;
}

const createNode = (row, col) => {
    return {
        row: row,
        col: col,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
    }
}

const getNewGridWithWallToggled = (nodes, row, col) => {
    const newNodes = nodes.slice();
    const node = newNodes[row][col];
    newNodes[row][col] = {
        ...node,
        isWall: !node.isWall,
    };

    return newNodes;
};