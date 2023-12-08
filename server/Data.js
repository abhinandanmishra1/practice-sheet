const problemIds = [
  "top-k-frequent-elements",
  "longest-palindromic-substring",
  "queue-reconstruction-by-height",
  "insert-delete-getrandom-o1",
  "divide-two-integers",
  "binary-tree-level-order-traversal",
  "license-key-formatting",
  "binary-tree-zigzag-level-order-traversal",
  "strobogrammatic-number-ii",
  "single-number",
  "robot-room-cleaner",
  "course-schedule-ii",
  "best-time-to-buy-and-sell-stock-with-cooldown",
  "minimum-domino-rotations-for-equal-row",
  "maximum-level-sum-of-a-binary-tree",
  "find-first-and-last-position-of-element-in-sorted-array",
  "merge-two-binary-trees",
  "logger-rate-limiter",
  "maximal-square",
  "group-anagrams",
  "add-strings",
  "campus-bikes-ii",
  "design-search-autocomplete-system",
  "network-delay-time",
  "count-of-smaller-numbers-after-self",
  "flatten-nested-list-iterator",
  "wildcard-matching",
  "summary-ranges",
  "longest-arithmetic-sequence",
  "campus-bikes-ii",
  "heaters",
  "student-attendance-record-i",
  "bulls-and-cows",
  "reconstruct-itinerary",
  "lru-cache",
  "flip-equivalent-binary-trees",
  "island-perimeter",
  "distribute-coins-in-binary-tree",
  "contains-duplicate",
  "partition-to-k-equal-sum-subsets",
  "find-and-replace-in-string",
  "kth-largest-element-in-an-array",
  "longest-univalue-path",
  "guess-number-higher-or-lower",
  "longest-arithmetic-sequence",
  "minimum-window-substring",
  "delete-operation-for-two-strings",
  "brace-expansion-ii",
  "word-ladder",
  "word-ladder-ii",
  "remove-duplicate-letters",
  "odd-even-jump",
  "invert-binary-tree",
  "maximum-binary-tree",
  "count-of-range-sum",
  "course-schedule",
  "android-unlock-patterns",
  "walls-and-gates",
  "spiral-matrix",
  "split-array-largest-sum",
  "continuous-subarray-sum",
  "isomorphic-strings",
  "design-snake-game",
  "two-sum",
  "intersection-of-two-arrays",
  "merge-sorted-array",
  "find-peak-element",
  "shortest-way-to-form-string",
  "first-bad-version",
  "subarray-sum-equals-k",
  "largest-rectangle-in-histogram",
  "maximum-subarray",
  "random-pick-with-weight",
  "kth-smallest-element-in-a-bst",
  "valid-sudoku",
  "decode-string",
  "range-sum-query-mutable",
  "unique-paths",
  "palindromic-substrings",
  "burst-balloons",
  "the-maze",
  "partition-equal-subset-sum",
  "evaluate-reverse-polish-notation",
  "sort-characters-by-frequency",
  "maximal-rectangle",
  "find-all-numbers-disappeared-in-an-array",
  "binary-tree-right-side-view",
  "rotated-digits",
  "closest-binary-search-tree-value",
  "graph-valid-tree",
  "house-robber",
  "letter-combinations-of-a-phone-number",
  "add-two-numbers",
  "encode-and-decode-tinyurl",
  "convert-sorted-array-to-binary-search-tree",
  "symmetric-tree",
  "climbing-stairs",
  "sentence-similarity-ii",
  "find-minimum-in-rotated-sorted-array",
  "happy-number",
  "range-sum-query-immutable",
  "regular-expression-matching",
  "plus-one",
  "best-time-to-buy-and-sell-stock-ii",
  "surrounded-regions",
  "serialize-and-deserialize-bst",
  "longest-consecutive-sequence",
  "subarray-product-less-than-k",
  "median-of-two-sorted-arrays",
  "longest-substring-without-repeating-characters",
  "read-n-characters-given-read4-ii-call-multiple-times",
  "queue-reconstruction-by-height",
  "valid-anagram",
  "valid-parentheses",
  "reverse-vowels-of-a-string",
  "same-tree",
  "as-far-from-land-as-possible",
  "maximum-depth-of-n-ary-tree",
  "strobogrammatic-number",
  "search-in-rotated-sorted-array",
  "daily-temperatures",
  "validate-binary-search-tree",
  "perfect-squares",
  "different-ways-to-add-parentheses",
  "maximum-product-subarray",
  "repeated-dna-sequences",
  "merge-intervals",
  "count-of-smaller-numbers-after-self",
  "increasing-triplet-subsequence",
  "lowest-common-ancestor-of-a-binary-search-tree",
  "arithmetic-slices",
  "best-time-to-buy-and-sell-stock",
  "unique-email-addresses",
  "flood-fill",
  "split-bst",
  "maximum-depth-of-binary-tree",
  "lowest-common-ancestor-of-a-binary-tree",
  "counting-bits",
  "jump-game",
  "campus-bikes",
  "encode-and-decode-strings",
  "search-in-a-binary-search-tree",
  "binary-search-tree-iterator",
  "number-of-islands",
  "find-median-from-data-stream",
  "meeting-rooms-ii",
  "binary-tree-paths",
  "median-of-two-sorted-arrays",
  "number-of-islands-ii",
  "jewels-and-stones",
  "diameter-of-binary-tree",
  "find-duplicate-file-in-system",
  "most-stones-removed-with-same-row-or-column",
  "vertical-order-traversal-of-a-binary-tree",
  "inorder-successor-in-bst-ii",
  "cracking-the-safe",
  "compare-strings-by-frequency-of-the-smallest-character",
  "balanced-binary-tree",
  "minimum-absolute-difference-in-bst",
  "remove-duplicates-from-sorted-array",
  "insert-into-a-binary-search-tree",
  "pacific-atlantic-water-flow",
  "game-of-life",
  "merge-k-sorted-lists",
  "sqrtx",
  "bomb-enemy",
  "count-of-smaller-numbers-after-self",
  "delete-nodes-and-return-forest",
  "word-break",
  "interval-list-intersections",
  "backspace-string-compare",
  "find-k-closest-elements",
  "24-game",
  "container-with-most-water",
  "binary-tree-maximum-path-sum",
  "reverse-string",
  "trapping-rain-water",
  "count-numbers-with-unique-digits",
  "number-of-corner-rectangles",
  "next-permutation",
  "decode-ways",
  "3sum",
  "binary-tree-longest-consecutive-sequence",
  "clone-graph",
  "count-complete-tree-nodes",
  "task-scheduler",
  "search-in-a-sorted-array-of-unknown-size",
  "serialize-and-deserialize-binary-tree",
  "assign-cookies",
  "time-based-key-value-store",
  "insert-interval",
  "path-sum",
  "edit-distance",
  "implement-trie-prefix-tree",
  "generate-parentheses",
  "max-sum-of-rectangle-no-larger-than-k",
  "the-skyline-problem",
];

module.exports = {
  problemIds
}