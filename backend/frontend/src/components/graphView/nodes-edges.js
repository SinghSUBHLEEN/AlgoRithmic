export const initialEdges = [{ source: 'Basics', target: 'Searching and Sorting' }, { source: 'Basics', target: 'Arrays and Hashing' }, { source: 'Basics', target: 'Strings' }, { source: 'Arrays and Hashing', target: 'Prefix Sum' }, { source: 'Arrays and Hashing', target: 'Linked List' }, { source: 'Searching and Sorting', target: 'Two Pointers' }, { source: 'Searching and Sorting', target: 'Binary Search' }, { source: 'Searching and Sorting', target: 'Sets and Hashmap' }, { source: 'Sets and Hashmap', target: 'Sliding Window' }, { source: 'Prefix Sum', target: 'Sliding Window' }, { source: 'Linked List', target: 'Sliding Window' }, { source: 'Binary Search', target: 'Sliding Window' }, { source: 'Linked List', target: 'Stack' }, { source: 'Linked List', target: 'Queue' }, { source: 'Linked List', target: 'Stack' }, { source: 'Sets and Hashmap', target: 'Backtracking' }, { source: 'Linked List', target: 'Backtracking' }, { source: 'Backtracking', target: 'Dynamic Programming' }, { source: 'Backtracking', target: 'Trees' }, { source: 'Dynamic Programming', target: 'Bit Manipulation' }, { source: 'Trees', target: 'Tries' }, { source: 'Trees', target: 'Priority Queue/Heap' }, { source: 'Trees', target: 'Graphs' }, { source: 'Priority Queue/Heap', target: 'Greedy' }, { source: 'Bit Manipulation', target: 'Greedy' }, { source: 'Bit Manipulation', target: 'Segment Trees and BIT' }, { source: 'Greedy', target: 'Segment Trees and BIT' }, { source: 'Graphs', target: 'Segment Trees and BIT' }];

export const initialNodes = [
    {
        id: 'Basics',
        type: 'custom',
        data: {
            label: 'Basics', attributes: [],
            backgroundColor: 'rgba(219, 241, 255, 1)',
            borderColor: 'rgba(, , , )',
        },
        position: { x: 0, y: 0 },
        type: 'input',
    },
    {
        id: 'Searching and Sorting',
        data: { label: 'Searching and Sorting' },
        position: { x: -700, y: 300 },
    },
    {
        id: 'Arrays and Hashing',
        data: { label: 'Arrays and Hashing' },
        position: { x: 0, y: 300 },
    },
    {
        id: 'Strings',
        data: { label: 'Strings' },
        position: { x: 700, y: 300 },
    },
    {
        id: 'Sets and Hashmap',
        data: { label: 'Sets and Hashmap' },
        position: { x: -900, y: 500 },
    },
    {
        id: 'Binary Search',
        data: { label: 'Binary Search' },
        position: { x: -700, y: 500 },
    },
    {
        id: 'Two Pointers',
        data: { label: 'Two pointers' },
        position: { x: -500, y: 500 },
    },
    {
        id: 'Prefix Sum',
        data: { label: 'Prefix sum' },
        position: { x: -100, y: 500 },
    }
    ,
    {
        id: 'Linked List',
        data: { label: 'Linked List' },
        position: { x: 100, y: 500 },
    }
    ,
    {
        id: 'Sliding Window',
        data: { label: 'Sliding Window' },
        position: { x: -300, y: 700 },
    },
    {
        id: 'Stack',
        data: { label: 'Stack', backgroundColor: 'black' },
        position: { x: 50, y: 700 },
    },
    {
        id: 'Queue',
        data: { label: 'Queue' },
        position: { x: 235, y: 700 },
    },
    {
        id: 'Backtracking',
        data: { label: 'Backtracking' },
        position: { x: -200, y: 900 },
    },
    {
        id: 'Dynamic Programming',
        data: { label: 'Dynamic Programming' },
        position: { x: -700, y: 1100 },
    },
    {
        id: 'Trees',
        data: { label: 'Trees' },
        position: { x: 300, y: 1100 },
    },
    {
        id: 'Bit Manipulation',
        data: { label: 'Bit Manipulation' },
        position: { x: -800, y: 1300 },
    },
    {
        id: 'Tries',
        data: { label: 'Tries' },
        position: { x: 0, y: 1300 },
    },
    {
        id: 'Priority Queue/Heap',
        data: { label: 'Priority Queue/Heap' },
        position: { x: 300, y: 1300 },
    },
    {
        id: 'Graphs',
        data: { label: 'Graphs' },
        position: { x: 600, y: 1300 },
    },
    {
        id: 'Greedy',
        data: { label: 'Greedy' },
        position: { x: -200, y: 1500 },
    },
    {
        id: 'Segment Trees and BIT',
        data: { label: 'Segment Trees and BIT' },
        position: { x: -300, y: 1700 },
    }
];