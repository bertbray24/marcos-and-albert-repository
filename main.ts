namespace SpriteKind {
    export const UI = SpriteKind.create()
}
/**
 * This part of code allows the player to be able to jump in the beginning and when the ball is reset.
 */
/**
 * This code deals with the "A" button which does multiple things. If your near the ball, it picks it up, your first press starts the meter, and then the second press launches the shot
 */
/**
 * This code allows the ball to go through the hoop, calculate the points, and reset for the next possession. It does this when you launch the ball, and it overlaps the hoop, it calls "calculate points" and calls "Award points." Afterwards, the player will say either "3 - Pointer" or "Scores" depending on the shot distance. After all of this, it is called "reset ball."
 */
/**
 * This code prevents the player from grabbing the ball mid - air while its shot. The ball has to be almost completely still to be picked up.
 */
/**
 * This "On Start" code explains how the game works and provides the player details on what to do.
 */
/**
 * This "on game update" part of code, includes the shot meters frame and the visuals of the moving bar. The code includes the dribble animations where the Ball Holder = 1, a dribble timer counts, which resets and advances a list based offset. It also includes ball physics, where if the ball is in the air, gravity pulls it down by increasing vy. If the ball hits the floor, it bounces by reversing and reducing vy, also if the ball hits the left/ right walls, vx reverses.
 */
/**
 * This function allows the player to time their shot with a meter. If they time it right, the ball will follow the hoop, which would make it go in. If they don't time it right, the ball picks a random velocity and position.
 */
/**
 * This function allows the player to be awarded points if they make the shot. If they do, a sound plays!
 */
/**
 * This function shows the setup, which includes the player starting position, the ball position, the dribble as an array, and the 30 secs the player has to make shots.
 */
/**
 * This function takes the distance between the x's and y's and uses a distance formula based on the Pythagorean Theorem to show the spacing between 2 sprites
 */
/**
 * asytgjaytguy
 */
/**
 * This function determines the amount of points based on the distance of the shot.
 */
/**
 * This function shows the "Bar Sprite" to time the shot, including the position and speed.
 */
// This function allows the ball to be reset when a shot is made. this includes the position, resets, and detaches the ball from any sprite it was following.
function Launch_Shot () {
    if (Marker_position >= Green_zone_min && Marker_position <= Green_zone_max) {
        Ball.setVelocity(65, -110)
        Ball.follow(Hoop_Right, 100)
        ball_following = true
    } else {
        Ball.setVelocity(60 + randint(-40, 40), -100)
    }
    Ball_holder = 0
    Shooting = false
}
function Award_Points (points: number) {
    Player1score = Player1score + points
    info.setScore(Player1score)
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Ball_holder == 1 && Shooting == false) {
        Shooting = true
        Marker_position = 0
        Marker_Direction = 1
        Green_Bar.setFlag(SpriteFlag.Invisible, false)
        Marker.setFlag(SpriteFlag.Invisible, false)
    } else if (Ball_holder == 1 && Shooting == true) {
        shot_x = player1.x
        Launch_Shot()
        Green_Bar.setFlag(SpriteFlag.Invisible, true)
        Marker.setFlag(SpriteFlag.Invisible, true)
    } else if (Ball_holder == 0) {
        if (Distance(player1, Ball) < 25) {
            Ball_holder = 1
        }
    }
})
function Distance (spriteA: Sprite, SpriteB: Sprite) {
    dx = spriteA.x - SpriteB.x
    dy = spriteA.y - SpriteB.y
    return Math.sqrt(dx * dx + dy * dy)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.UI, function (sprite, otherSprite) {
    if (otherSprite == Hoop_Right && Ball_holder == 0) {
        PTS = CalculatePoints()
        Award_Points(PTS)
        Ball.setVelocity(0, 80)
        pause(300)
        if (PTS == 3) {
            player1.sayText("3-POINTER!!", 1500, false)
        } else {
            player1.sayText("Scores!!!", 1500, false)
        }
        Reset_Ball()
    }
})
function CalculatePoints () {
    distance = Math.abs(shot_x - 152)
    if (distance > 55) {
        return 3
    } else {
        return 2
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    if (Ball_holder == 0 && (Math.abs(Ball.vx) < 10 && (Math.abs(Ball.vy) < 10 && ball_following == false))) {
        if (sprite == player1) {
            Ball_holder = 1
        }
    }
})
function Green_Bar2 () {
    Green_Bar = sprites.create(img`
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        .ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.
        .fdddddddddddddddddddddd77777777777777ddddddddddddddddddddddddf.
        .fdddddddddddddddddddddd77777777777777ddddddddddddddddddddddddf.
        .fdddddddddddddddddddddd77777777777777ddddddddddddddddddddddddf.
        .fdddddddddddddddddddddd77777777777777ddddddddddddddddddddddddf.
        .fdddddddddddddddddddddd77777777777777ddddddddddddddddddddddddf.
        .ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        `, SpriteKind.UI)
    Marker = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . f f f f f f f f f f . . 
        . . . . f f f f f f f f f f . . 
        . . . . f f f f f f f f f f . . 
        . . . . f f f f f f f f f f . . 
        . . . . f f f f f f f f f f . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.UI)
    Green_Bar.setFlag(SpriteFlag.Invisible, true)
    Marker.setFlag(SpriteFlag.Invisible, true)
    Green_Bar.setPosition(80, 110)
    Marker.setPosition(57, 103)
    Hoop_Right = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 1 . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.UI)
    Hoop_Right.setPosition(143, 74)
    Hoop_Right.setFlag(SpriteFlag.Invisible, true)
}
controller.player1.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    if (Player1jump == false) {
        Player1jump = true
        player1.vy = -100
    }
})
function Set_up () {
    Ball = sprites.create(img`
        . . . . f f f f f f . . . . . . 
        . . f f 6 6 6 f 6 6 f f . . . . 
        . f 6 f 6 6 6 f 6 6 f 6 f . . . 
        . f 6 6 f 6 6 f 6 f 6 6 f . . . 
        f 6 6 6 f 6 6 f 6 f 6 6 6 f . . 
        f 6 6 6 f 6 6 f 6 f 6 6 6 f . . 
        f 6 6 6 f 6 6 f 6 f 6 6 6 f . . 
        f f f f f f f f f f f f f f . . 
        f 6 6 6 f 6 6 f 6 f 6 6 6 f . . 
        f 6 6 6 f 6 6 f 6 f 6 6 6 f . . 
        f 6 6 6 f 6 6 f 6 f 6 6 6 f . . 
        . f 6 f 6 6 6 f 6 6 f 6 f . . . 
        . f f 6 6 6 6 f 6 6 6 f f . . . 
        . . f f f f f f f f f f . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Projectile)
    player1 = sprites.create(img`
        ................ffff............
        ................ffff............
        ................ffff............
        ................eeee............
        ................eeef............
        ................eeee............
        ................eeed............
        ................eeee............
        ................eeee............
        .................ee.............
        ................2222............
        ................2222............
        ................2ee2............
        ................2ee2............
        ................2ee2............
        ................2ee2............
        ................2222............
        ................2222............
        ................2..2............
        ................e..e............
        ................2..2............
        ................2..2............
        ................................
        ................................
        ................................
        ................................
        ................................
        ................................
        ................................
        ................................
        ................................
        ................................
        `, SpriteKind.Player)
    controller.player1.moveSprite(player1, 100, 0)
    player1.setPosition(55, 90)
    Ball.ay = 300
    Ball.setPosition(80, 90)
    Bounce_Offset = 0
    PTS = 0
    distance = 0
    Dribble_step = 0
    dribble_Timer = 0
    Player1jump = false
    Green_zone_min = 35
    Green_zone_max = 65
    Marker_Direction = 1
    Marker_position = 0
    Shooting = false
    Ball_holder = 0
    Player1score = 0
    ball_following = false
    shot_x = 0
    Dribble = [
    1,
    3,
    5,
    7,
    5,
    3,
    1,
    0
    ]
    player1.ay = 250
    info.setScore(0)
    info.startCountdown(30)
    player1.setStayInScreen(true)
    Green_Bar2()
}
function Reset_Ball () {
    Ball.unfollow()
    ball_following = false
    Ball.setPosition(80, 90)
    Ball.setVelocity(0, 0)
    Ball_holder = 0
    Shooting = false
    Marker_position = 0
    Green_Bar.setFlag(SpriteFlag.Invisible, true)
    Marker.setFlag(SpriteFlag.Invisible, true)
}
let Dribble: number[] = []
let dribble_Timer = 0
let Dribble_step = 0
let Bounce_Offset = 0
let Player1jump = false
let distance = 0
let PTS = 0
let dy = 0
let dx = 0
let player1: Sprite = null
let shot_x = 0
let Marker: Sprite = null
let Green_Bar: Sprite = null
let Marker_Direction = 0
let Player1score = 0
let Shooting = false
let Ball_holder = 0
let ball_following = false
let Hoop_Right: Sprite = null
let Ball: Sprite = null
let Green_zone_max = 0
let Green_zone_min = 0
let Marker_position = 0
scene.setBackgroundImage(img`
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccffffcccffffcccffffcccffffcccffffcccffffcccffffcccffffccccccccccccccccccccccccccccccccccccccccffffcccffffcccffffcccffffcccffffcccffffcccffffcccffffccccccc
    ccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffccccccccccccccccccccccccccccccccccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffcccccc
    ccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffccccccccccccccccccccccccccccccccccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffcccccc
    ccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffccccccccccccccccccccccccccccccccccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffcccccc
    ccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffccccccccccccccccccccccccccccccccccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffcccccc
    ccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffccccccccccccccccccccccccccccccccccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffcccccc
    ccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffccccccccccccccccccccccccccccccccccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffcccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccffffcccffffcccffffcccffffcccffffcccffffcccffffcccffffccccccccccccccccccccccccccccccccccccccccffffcccffffcccffffcccffffcccffffcccffffcccffffcccffffccccccc
    ccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffccccccccccccccccccccccccccccccccccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffcccccc
    ccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffccccccccccccccccccccccccccccccccccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffcccccc
    ccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffccccccccccccccccccccccccccccccccccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffcccccc
    ccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffccccccccccccccccccccccccccccccccccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffcccccc
    ccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffccccccccccccccccccccccccccccccccccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffcccccc
    ccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffccccccccccccccccccccccccccccccccccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffcccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccffffcccffffcccffffcccffffcccffffcccffffcccffffcccffffccccccccccccccccccccccccccccccccccccccccffffcccffffcccffffcccffffcccffffcccffffcccffffcccffffccccccc
    ccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffccccccccccccccccccccccccccccccccccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffcccccc
    ccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffccccccccccccccccccccccccccccccccccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffcccccc
    ccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffccccccccccccccccccccccccccccccccccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffcccccc
    ccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffccccccccccccccccccccccccccccccccccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffcccccc
    ccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffccccccccccccccccccccccccccccccccccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffcccccc
    ccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffccccccccccccccccccccccccccccccccccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffcccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccffffcccffffcccffffcccffffcccffffcccffffcccffffcccffffccccccccccccccccccccccccccccccccccccccccffffcccffffcccffffcccffffcccffffcccffffcccffffcccffffccccccc
    ccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffccccccccccccccccccccccccccccccccccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffcccccc
    ccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffccccccccccccccccccccccccccccccccccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffcccccc
    ccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffccccccccccccccccccccccccccccccccccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffcccccc
    ccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffccccccccccccccccccccccccccccccccccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffcccccc
    ccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffccccccccccccccccccccccccccccccccccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffcccccc
    ccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffccccccccccccccccccccccccccccccccccccccffffffcffffffcffffffcffffffcffffffcffffffcffffffcffffffcccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111112222222222221122222222222222222222222222221122222222222222211111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111112222222222221122222222222222222222222222221122222222222222221111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111112222222222221122222222222222222222222222221122222222222222222111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111112222222222211122222222222211122222222222221122222211111222222111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111112222222222211122222222222211122222222222211122222211111222222111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111112222222222211112222222222221122222222221111122222211111222222111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111112222222222211111122222222221122222111111111122222211111222222111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111112222221111111111111111222221122222111111111122222211111222222111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111112222221111111111111111222221122222111111111122222211111222222111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111112222221111111122222222222221122222111111111122222211111222222111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111112222222222211122222222222221122222111111111122222211111222222111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111112222222222211122222222222211122222111111111122222211111222222111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111112222222222211122222222221111122222111111111122222211111222222111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444ffffffff44444444444444444444444444444444444444444444
    ffffffffff44444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444ffffff444444444444444444444444444444444444444444444ddddddd
    fffffffffffff444444444444444444444444444444444444444444444444444444444444444444444444444444444444444ff444444444444444444444444444444444444444444444444444ddddddd
    4444444444ffffff4444444444444444444444444444444444444444444444444444444444444444444444444444444444ff44444444444444444444444444444444444444444444444444444ddddddd
    4444444444444ffff4444444444444444444444444444444444444444444444444444444444444444444444444444444ff4444444444444444444444444444444444444444444444444444444ddd1111
    4444444444444444fff44444444444444444444444444444444444444444444444444444444444444444444444444444ff4444444444444444444444444444444444444444444444444444444ddd1111
    44444444444444444ffff4444444444444444444444444444444444444444444444444444444444444444444444444ff444444444444444444444444444444444444444444444444444444444ddd1111
    4444444444444444444fff4444444444444444444444444444444444444444444444444444444444444444444444ff44444444444444444444444444444444444444444444444444444444444ddd1111
    444444444444444444444ff44444444444444444444444444444444444444444444444444444444444444444ffff4444444444444444444444444444444444444444444444444444444444444ddd1111
    4444444444444444444444ff4444444444444444444444444444444444444444444444444444444444444444ffff4444444444444444444444444444444444444444444444444444444444444ddd1111
    44444444444444444444444ff4444444444444444444444444444444444444444444444444444444444444ff44444444444444444444444444444444444444444444444444444444444444444ddd1111
    444444444444444444444444ff444444444444444444444444444444444444444444444444444444444444ff44444444444444444444444444444444444444444444444444444444444444444ddd1111
    4444444444444444444444444ff44444444444444444444444444444444444444444444444444444444444ff44444444444444444444444444444444444444444444422222222222222222222ddd1111
    44444444444444444444444444f444444444444444444444444444444444444444444444444444444444ff44444444444444444444444444444444444444444442222144411144111444111442221111
    44444444444444444444444444ff444444444444444444444444444444444444444444444444444444ff4444444444444444444444444444444444444444444442222144411144111444111442221111
    444444444444444444444444444f444444444444444444444444444444444444444444444444444444ff444444444444444444444444444444444444444444444444422222222222222222222ddd1111
    444444444444444444444444444ff44444444444444444444444444444444444444444444444444444ff444444444444444444444444444444444444444444444444441114441144411144411ddd1111
    4444444444444444444444444444ff4444444444444444444444444444444444444444444444444444ff444444444444444444444444444444444444444444444444444441114411144411144ddd1111
    4444444444444444444444444444ff44444444444444444444444444444444444444444444444444ff44444444444444444444444444444444444444444444444444444441114411144411144ddd1111
    44444444444444444444444444444f44444444444444444444444444444444444444444444444444ff44444444444444444444444444444444444444444444444444444441114411144411144ddd1111
    44444444444444444444444444444ff4444444444444444444444444444444444444444444444444ff44444444444444444444444444444444444444444444444444444444441144411144444ddddddd
    44444444444444444444444444444ff44444444444444444444444444444444444444444444444ff4444444444444444444444444444444444444444444444444444444444444444444444444444eeee
    44444444444444444444444444444ff44444444444444444444444444444444444444444444444ff4444444444444444444444444444444444444444444444444444444444444444444444444444eeee
    444444444444444444444444444444ff4444444444444444444444444444444444444444444444ff4444444444444444444444444444444444444444444444444444444444444444444444444444eeee
    444444444444444444444444444444ff4444444444444444444444444444444444444444444444ff4444444444444444444444444444444444444444444444444444444444444444444444444444eeee
    444444444444444444444444444444ff4444444444444444444444444444444444444444444444ff444444444444444444444444444444ffffffffffffffffffffffffffffffffffffffffffffffeeee
    444444444444444444444444444444ff4444444444444444444444444444444444444444444444ff44444444444444444444444444ffff4444ff4444444444444444444444444444444444444444eeee
    444444444444444444444444444444ff4444444444444444444444444444444444444444444444ff4444444444444444444444ffff44444444ff4444444444444444444444444444444444444444eeee
    444444444444444444444444444444ff4444444444444444444444444444444444444444444444ff44444444444444444444ff444444444444ff4444444444444444444444444444444444444444eeee
    444444444444444444444444444444ff4444444444444444444444444444444444444444444444ff44444444444444444444ff444444444444ff4444444444444444444444444444444444444444eeee
    444444444444444444444444444444ff4444444444444444444444444444444444444444444444ff444444444444444444ff44444444444444ff4444444444444444444444444444444444444444eeee
    444444444444444444444444444444ff4444444444444444444444444444444444444444444444ff4444444444444444ff4444444444444444ff4444444444444444444444444444444444444444eeee
    444444444444444444444444444444ff4444444444444444444444444444444444444444444444ff4444444444444444ff4444444444444444ff4444444444444444444444444444444444444444eeee
    444444444444444444444444444444ff4444444444444444444444444444444444444444444444ff4444444444444444ff4444444444444444ff4444444444444444444444444444444444444444eeee
    444444444444444444444444444444ff4444444444444444444444444444444444444444444444ff4444444444444444ff4444444444444444ff4444444444444444444444444444444444444444eeee
    444444444444444444444444444444ff4444444444444444444444444444444444444444444444ff4444444444444444ff4444444444444444ff4444444444444444444444444444444444444444eeee
    444444444444444444444444444444ff4444444444444444444444444444444444444444444444ff4444444444444444ff4444444444444444ff4444444444444444444444444444444444444444eeee
    444444444444444444444444444444ff4444444444444444444444444444444444444444444444ff444444444444444444ff44444444444444ff4444444444444444444444444444444444444444eeee
    444444444444444444444444444444f44444444444444444444444444444444444444444444444ff44444444444444444444ff444444444444ff4444444444444444444444444444444444444444eeee
    444444444444444444444444444444f4444444444444444444444444444444444444444444444444ff44444444444444444444ffff44444444ff4444444444444444444444444444444444444444eeee
    44444444444444444444444444444ff4444444444444444444444444444444444444444444444444ff444444444444444444444444ffff4444ff4444444444444444444444444444444444444444eeee
    44444444444444444444444444444f44444444444444444444444444444444444444444444444444ff444444444444444444444444ffff4444ff4444444444444444444444444444444444444444eeee
    44444444444444444444444444444f44444444444444444444444444444444444444444444444444ff4444444444444444444444444444ffffffffffffffffffffffffffffffffffffffffffffffeeee
    4444444444444444444444444444ff4444444444444444444444444444444444444444444444444444ff444444444444444444444444444444444444444444444444444444444444444444444444eeee
    444444444444444444444444444ff44444444444444444444444444444444444444444444444444444ff4444444444444444444444444444444444444444444444444444444444444444444444444444
    444444444444444444444444444f444444444444444444444444444444444444444444444444444444ff4444444444444444444444444444444444444444444444444444444444444444444444444444
    44444444444444444444444444ff44444444444444444444444444444444444444444444444444444444ff44444444444444444444444444444444444444444444444444444444444444444444444444
    44444444444444444444444444f444444444444444444444444444444444444444444444444444444444ff44444444444444444444444444444444444444444444444444444444444444444444444444
    4444444444444444444444444ff44444444444444444444444444444444444444444444444444444444444ff444444444444444444444444444444444444444444444444444444444444444444444444
    444444444444444444444444ff444444444444444444444444444444444444444444444444444444444444ff444444444444444444444444444444444444444444444444444444444444444444444444
    44444444444444444444444ff444444444444444444444444444444444444444444444444444444444444444ffff44444444444444444444444444444444444444444444444444444444444444444444
    4444444444444444444444ff4444444444444444444444444444444444444444444444444444444444444444ffff44444444444444444444444444444444444444444444444444444444444444444444
    444444444444444444444ff444444444444444444444444444444444444444444444444444444444444444444444ff444444444444444444444444444444444444444444444444444444444444444444
    4444444444444444444fff4444444444444444444444444444444444444444444444444444444444444444444444ff444444444444444444444444444444444444444444444444444444444444444444
    44444444444444444ffff4444444444444444444444444444444444444444444444444444444444444444444444444ff4444444444444444444444444444444444444444444444444444444444444444
    4444444444444444fff44444444444444444444444444444444444444444444444444444444444444444444444444444ff44444444444444444444444444444444444444444444444444444444444444
    4444444444444ffff444444444444444444444444444444444444444444444444444444444444444444444444444444444ff444444444444444444444444444444444444444444444444444444444444
    4444444444ffffff444444444444444444444444444444444444444444444444444444444444444444444444444444444444ff4444444444444444444444444444444444444444444444444444444444
    fffffffffffff44444444444444444444444444444444444444444444444444444444444444444444444444444444444444444ffffff4444444444444444444444444444444444444444444444444444
    ffffffffff44444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444ffffff4444444444444444444444444444444444444444444444444444
    444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444ffff444444444444444444444444444444444444444444444444
    4444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444ff4444444444444444444444444444444444444444444444
    444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444ffffffff44444444444444444444444444444444444444
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    `)
game.splash("BASKETBALL - Get as many points as you can in 30 seconds")
game.splash("Arrow keys to move | A = Pickup/Shoot | B = Jump")
game.splash("Stop the marker in the GREEN zone to score! Miss = random shot")
Set_up()
game.onUpdate(function () {
    if (Shooting == true) {
        Marker_position = Marker_position + Marker_Direction * 4
        if (Marker_position >= 100) {
            Marker_position = 100
            Marker_Direction = -1
        }
        if (Marker_position <= 0) {
            Marker_position = 0
            Marker_Direction = 1
        }
        Marker.x = 57 + Marker_position * 45 / 100
    }
    if (Ball_holder == 1) {
        dribble_Timer = dribble_Timer + 1
        if (dribble_Timer >= 4) {
            dribble_Timer = 0
            Dribble_step = (Dribble_step + 1) % 8
        }
        Bounce_Offset = Dribble[Dribble_step]
        Ball.setPosition(player1.x + 8, player1.y + Bounce_Offset)
        Ball.setVelocity(0, 0)
    }
    if (Ball_holder == 0 && ball_following == false) {
        if (Ball.y > 93) {
            Ball.y = 93
            Ball.vy = Ball.vy * -0.45
            Ball.vx = Ball.vx * 0.75
        }
        if (Ball.x < 8) {
            Ball.x = 8
            Ball.vx = Math.abs(Ball.vx)
        }
        if (Ball.x > 152) {
            Ball.x = 152
            Ball.vx = Math.abs(Ball.vx) * -1
        }
    }
    if (Player1jump == true && (player1.y >= 90 && player1.vy >= 0)) {
        player1.y = 90
        player1.vy = 0
        Player1jump = false
    }
})
