export default function(body, tailDegree) {
    const secondLast = body[body.length - 2]
    const tail = body[body.length - 1]
    if(tail.x == tail.previousX) {
        if(tail.y < tail.previousY){
            //up 
            if(secondLast.x < tail.x){
                //turn anticlockwise
                tailDegree = tailDegree - 90 
                tail.div.style.transform = `rotate(${tailDegree}deg)`
            } else if(secondLast.x > tail.x){
                //turn clockwise
                tailDegree = tailDegree + 90 
                tail.div.style.transform = `rotate(${tailDegree}deg)`
            }       
        } else if (tail.y > tail.previousY){
            //down 
            if(secondLast.x > tail.x){
                //turn anticlockwise
                tailDegree = tailDegree - 90 
                tail.div.style.transform = `rotate(${tailDegree}deg)`
            } else if(secondLast.x < tail.x){
                //turn lockwise
                tailDegree = tailDegree + 90 
                tail.div.style.transform = `rotate(${tailDegree}deg)`
            }       
        }
    } else if(tail.y == tail.previousY) {
        if(tail.x < tail.previousX){
            //left 
            if(secondLast.y < tail.y){
                //turn clockwise
                tailDegree = tailDegree + 90 
                tail.div.style.transform = `rotate(${tailDegree}deg)`
            } else if(secondLast.y > tail.y){
                //turn anticlockwise
                tailDegree = tailDegree - 90 
                tail.div.style.transform = `rotate(${tailDegree}deg)`
            }       
        } else if(tail.x > tail.previousX) {
            //right 
            if(secondLast.y < tail.y){
                //turn anticlockwise
                tailDegree = tailDegree - 90 
                tail.div.style.transform = `rotate(${tailDegree}deg)`
            } else if(secondLast.y > tail.y){
                //turn clockwise
                tailDegree = tailDegree + 90 
                tail.div.style.transform = `rotate(${tailDegree}deg)`
            }       
        }
    }
    return tailDegree

}