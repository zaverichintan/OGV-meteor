if (Models.find().count() === 0) 
{
   Models.insert({
	name: 'spherical.obj',
	userid : '1',
	lovemeter : '13'
    });
    
   Models.insert({
	name: 'cube.obj',
	userid : '1',
	lovemeter : '9'
    });

    
   Models.insert({
	name: 'diamond.obj',
	userid : '1',
	lovemeter : '7'
    });
}
