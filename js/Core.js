const STATE_NUM = 4;
	const STATE_EMPTY = 0;
	const STATE_WALL  = 1;
	const STATE_COPY  = 2;
	const STATE_MOVE  = 3;

//**

var TRANSITION_LIVE = function(c, x, y) {
	var sum = 0;
	
	if (getC(c, x - 1, y) == STATE_COPY) sum++;
	if (getC(c, x - 1, y + 1) == STATE_COPY) sum++;
	if (getC(c, x - 1, y - 1) == STATE_COPY) sum++;
	if (getC(c, x, y - 1) == STATE_COPY) sum++;
	if (getC(c, x, y + 1) == STATE_COPY) sum++;
	if (getC(c, x + 1, y - 1) == STATE_COPY) sum++;
	if (getC(c, x + 1, y) == STATE_COPY) sum++;
	if (getC(c, x + 1, y + 1) == STATE_COPY) sum++;
	
	if (getC(c, x, y) == STATE_EMPTY && sum == 3)
		return STATE_COPY;
	
	if (getC(c, x, y) == STATE_COPY && sum != 2 && sum != 3)
		return STATE_EMPTY;
	
	return getC(c, x, y);
}

var TRANSITION = function(c, x, y) {
	if (getC(c, x, y) == STATE_WALL)
		return STATE_WALL;
	
	if (getC(c, x, y) == STATE_EMPTY) {
		if (getC(c, x - 1, y - 1) == STATE_COPY) {
			var copyBlock = getC(c, x - 2, y - 1);
			
			if (copyBlock != STATE_EMPTY && copyBlock != STATE_WALL)
				return copyBlock;
		}
		
		if (getC(c, x - 1, y + 1) == STATE_COPY) {
			var copyBlock = getC(c, x - 2, y + 1);
			
			if (copyBlock != STATE_EMPTY && copyBlock != STATE_WALL)
				return copyBlock;
		}
	}
	
	if (getC(c, x + 1, y) == STATE_COPY)
		return STATE_EMPTY;
	
	return getC(c, x, y);
};

//*************************************

const START_FIELD = [ [ [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
	                [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
	                [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
	                [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
	                [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
	                [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
	                [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
	                [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
	                [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
	                [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
	                [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
	                [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
	                [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
	                [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
	                [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
	                [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ] ],
		
	              [ [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
	                [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
	                [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
	                [ 1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 1 ],
	                [ 1, 0, 0, 2, 2, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 1 ],
      	                [ 1, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 1 ],
	                [ 1, 0, 2, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 1 ],
	                [ 1, 0, 2, 0, 0, 2, 0, 0, 0, 0, 2, 2, 0, 0, 0, 1 ],
      	                [ 1, 0, 2, 0, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0, 0, 1 ],
	                [ 1, 0, 0, 2, 2, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 1 ],
	                [ 1, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 0, 0, 1 ],
	                [ 1, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 1 ],
	                [ 1, 0, 0, 2, 0, 0, 0, 0, 2, 0, 2, 2, 0, 0, 0, 1 ],
	                [ 1, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 1 ],
	                [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
	                [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ] ],
		  
		      [ [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
	                [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
      	                [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
	                [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1 ],
	                [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1 ],
	                [ 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 1 ],
	                [ 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 1 ],
	                [ 1, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 1 ],
	                [ 1, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 1 ],
	                [ 1, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 1 ],
	                [ 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 1 ],
	                [ 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 1 ],
            	        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1 ],
	                [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1 ],
	                [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
	                [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ] ] ];

//*************************************

function turnAutomaton(a) {
	var cTmp = new Array(a.m);
	
	for (var i = 0; i < a.m; i++)
		cTmp[i] = new Array(a.n);
	
	for (var i = 0; i < a.m; i++)
		for (var j = 0; j < a.n; j++)
			cTmp[j][i] = a.t(a.c, i, j);
	
	a.c = cTmp;
}

function getC(c, x, y) {
	if (x < 0 || x >= a.m || y < 0 || y >= a.n)
		return STATE_EMPTY;
	else
		return c[y][x];
}

var a = { m: 16,
          n: 16,
          c: START_FIELD[2],
          t: TRANSITION };

