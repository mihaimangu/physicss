$(document).ready(function(){
    var rotations = 0;
    var rpm = 0;
    var fuel = 200;
    var initialFuel = fuel;
    
    $("#rotations").html(rotations);
    
    var interval = '';
    
   $('#start-engine').click(function(){
    var speed = 100;
      setSpeed(speed);
       
       
   });
    $('#stop-engine').click(function(){
        console.log('stoping interval', interval);
        clearInterval(interval);
   });
    
    $("#move-up").click(function(){
       moveUp(300, function(){
           console.log('moving up')
       }); 
    });
    
    $("#move-down").click(function(){
       moveDown(300, function(){
           console.log('moving down');
       }); 
    });
    
    $('.speed-control.high').click(function(){
        clearInterval(interval);
        setSpeed(20);
    });
    
     $('.speed-control.medium').click(function(){
         clearInterval(interval);
        setSpeed(50);
    });
    
     $('.speed-control.low').click(function(){
         clearInterval(interval);
        setSpeed(100);
    });
    
    function setSpeed(speed){
       //Cycle(speed);
       interval = setInterval(function(){Cycle(speed)}, speed*2.7);
        rpm = 60000 / ( speed*2 );
        $("#rpm").html(rpm);
    };
    
    function Cycle(speed){
      
        moveUp(speed, engineTurn);
        moveDown(speed, engineTurn);
        
        function engineTurn(){
           
            rotations = rotations + 0.5;
            if(fuel > 0){
                 fuel --;
            }
           
        }
        
        var fuelRemaining = fuel/initialFuel;
        $("#rotations").html(Math.floor(rotations));
         $("#fuel").html(fuelRemaining * 100);
        $('.fuel-indicator').width(fuelRemaining * 100 + '%');
        
        if((fuelRemaining * 100) < 5){
            console.log('out of fuel');
            clearInterval(interval);
        }
    }
    
    function moveUp(speed, callback){
        //console.log("moving up");
        $(".piston").animate({
            marginTop: '10px'
        }, speed, function(){
            callback();
        })
    }
    
    function moveDown(speed, callback){
        //console.log('movind down');
        $(".piston").animate({
            marginTop: '100px'
        }, speed, function(){
           callback();
        })
    }
    
}) 