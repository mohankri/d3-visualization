var statusData = [
["Intermediate", "UNLIMITED0", 1000, 0],
["Intermediate", "UNLIMITED1", 200, 0],
["Intermediate", "UNLIMITED2", 500, 0],
["Intermediate", "UNLIMITED3", 700, 0],
["Intermediate", "UNLIMITED4", 800, 0],
["Intermediate", "UNLIMITED5", 600, 0],
["Intermediate", "UNLIMITED6", 100, 0],
];

sample = _.map(statusData, function(elem) {
        return [elem[0], elem[1], elem[2], elem[3]]
}) 
