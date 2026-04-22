namespace SpriteKind {
    export const UI = SpriteKind.create()
}
// This Is our unit 5 project. Functions with parameters and return values are used in Launch_Shot, CalculatePoints, Award_Points, and Distance, each taking inputs and returning or producing results based on those values. Conditional statements and boolean operators appear in the blocking mechanic and shooting state system using if and else if chains combined with and and or logic. User input is handled through the Keybinds extension which remaps keyboard controls so both players can play simultaneously on the same keyboard. The game update loop iterates every frame handling ball physics, dribble animation, and win checking. Arrays store dribble offsets, player names, and game messages that are accessed by index throughout the game. Two players compete with independent scores tracked and displayed through the Info extension. A tile map loads the court and defines the play area boundaries. The Info extension serves as the existing extension for live score display on screen, while the custom Keybinds extension by Brohann3214 is the user-added extension that solves MakeCode's default single-player input limitation and enables true simultaneous two-player keyboard gameplay.
function Launch_Shot (PlayerNum: number) {
    if (Marker_position >= Green_zone_min && Marker_position <= Green_zone_max) {
        if (PlayerNum == 1) {
            Ball.setVelocity(65, -110)
            Ball.follow(Hoop_Right, 100)
            ball_following = true
        }
    } else {
        if (PlayerNum == 1) {
            Ball.setVelocity(60 + randint(-40, 40), -100)
        }
    }
    Ball_holder = 0
    Shooting = false
}
function Award_Points (points: number) {
    Player1score = 0
    info.player1.setScore(Player1score)
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
}
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
        if (PTS == 2) {
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
        return 2
    } else {
        return 1
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
controller.player1.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    if (Ball_holder == 1 && Shooting == false) {
        Shooting = true
        Marker_position = 0
        Marker_Direction = 1
        Green_Bar.setFlag(SpriteFlag.Invisible, false)
        Marker.setFlag(SpriteFlag.Invisible, false)
    } else if (Ball_holder == 1 && Shooting == true) {
        shot_x = player1.x
        Launch_Shot(1)
        Green_Bar.setFlag(SpriteFlag.Invisible, true)
        Marker.setFlag(SpriteFlag.Invisible, true)
    } else if (Ball_holder == 0) {
        if (Distance(player1, Ball) < 25) {
            Ball_holder = 1
        }
    }
})
controller.player1.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    if (Player1jump == false) {
        Player1jump = true
        player1.vy = -100
    }
})
function Set_up () {
    blocked = false
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
    info.player1.setScore(0)
    player1.ay = 250
    tiles.setCurrentTilemap(tilemap`level1`)
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
    player1.setPosition(55, 90)
    player1.setVelocity(0, 0)
    Player1jump = false
    blocked = false
}
let Dribble: number[] = []
let dribble_Timer = 0
let Dribble_step = 0
let Bounce_Offset = 0
let blocked = false
let Player1jump = false
let Marker_Direction = 0
let Marker: Sprite = null
let Green_Bar: Sprite = null
let shot_x = 0
let distance = 0
let player1: Sprite = null
let PTS = 0
let dy = 0
let dx = 0
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
Keybinds.setSimulatorKeymap(
Keybinds.PlayerNumber.ONE,
Keybinds.CustomKey.UP,
Keybinds.CustomKey.DOWN,
Keybinds.CustomKey.LEFT,
Keybinds.CustomKey.RIGHT,
Keybinds.CustomKey.M,
Keybinds.CustomKey.P
)
game.splash("BASKETBALL - Get as many points as you can in 30 seconds")
game.splash("Arrow keys to move | M = Pickup/Shoot | P = Jump/Block")
game.splash("Stop the marker in the GREEN zone to score! Miss = random shot")
Set_up()
game.onUpdate(function () {
    let jump_ball_active = false
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
        if (Ball_holder == 1) {
            Ball.setPosition(player1.x + 8, player1.y + Bounce_Offset)
        }
        Ball.setVelocity(0, 0)
    }
    if (Ball_holder == 0 && ball_following == false) {
        Ball.vy = Ball.vy + 3
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
    if (Player1jump == true && (blocked == false && (Distance(player1, Ball) < 22 && (Ball_holder == 0 || ball_following == true))) && (Math.abs(Ball.vx) > 20 || Math.abs(Ball.vy) > 20) && jump_ball_active == false) {
        Ball.unfollow()
        ball_following = false
        blocked = true
        Ball.setVelocity(randint(-70, 70), randint(-90, -40))
        player1.sayText("BLOCKED!", 1500, false)
    }
})
