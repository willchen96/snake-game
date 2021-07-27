import opposite from './_opposite'
import keyToDirection from './_key-to-direction'

export default function(e, directionTracker) {
    if(e.code === "ArrowUp" || e.code === "ArrowDown" || e.code === "ArrowLeft" || e.code === "ArrowRight") {
        if(keyToDirection(e) !== opposite[directionTracker]) {
            return 'change'
        } else {
            return 'no change'
        }
    } else {
        return 'stop'
    }
}