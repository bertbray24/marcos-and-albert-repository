namespace SpriteKind {
    export const UI = SpriteKind.create()
}
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
    player2 = sprites.create(img`
        ............ffff................
        ............ffff................
        ............ffff................
        ............eeee................
        ............feee................
        ............eeee................
        ............deee................
        ............eeee................
        .............ee.................
        ............8888................
        ............8888................
        ............8888................
        ............8ee8................
        ............8ee8................
        ............8ee8................
        ............8888................
        ............8888................
        ............8..8................
        ............e..e................
        ............8..8................
        ............8..8................
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
        ................................
        `, SpriteKind.Player)
    controller.player2.moveSprite(player2)
    controller.player1.moveSprite(player1)
    player1.setPosition(60, 87)
    player2.setPosition(99, 87)
    Ball.setPosition(80, 87)
    Bounce_Offset = 0
    Winner = 0
    PTS = 0
    distance = 0
    Dribble_step = 0
    dribble_Timer = 0
    Player2jump = false
    Player1jump = false
    Green_zone_min = 35
    Green_zone_max = 65
    Marker_Direction = 1
    Marker_position = 0
    Shooting = false
    Ball_holder = 0
    Player2Score = 0
    Player1score = 0
    Dribble = [
    2,
    5,
    9,
    14,
    9,
    5,
    2,
    0
    ]
    Game_messages = [
    " Swish!",
    " Scores!",
    " Blocked!",
    " Miss!",
    " Wins!",
    " 3!!"
    ]
    Player_Names = [" Player 1", " Player 2"]
    Hoop_x = [8, 152]
    info.player1.setScore(0)
    info.player2.setScore(0)
    player1.ay = 250
    player2.ay = 250
    tiles.setCurrentTilemap(tilemap`level1`)
    player1.setStayInScreen(true)
    player2.setStayInScreen(true)
}
function Award_Points (playernum: number, points: number) {
    if (playernum == 1) {
        Player1score = Player1score + points
        info.player1.setScore(Player1score)
    } else {
        Player2Score = Player2Score + points
        info.player2.setScore(Player1score)
    }
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.UntilDone)
}
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
        `, SpriteKind.Player)
    Green_Bar.setFlag(SpriteFlag.Invisible, true)
    Marker.setFlag(SpriteFlag.Invisible, true)
}
function Distance (spriteA: Sprite, SpriteB: Sprite) {
    dx = spriteA.x - SpriteB.x
    dy = spriteA.y - SpriteB.y
    return Math.sqrt(dx * dx + dy * dy)
}
function Check_Winner () {
    if (Player1score >= 11) {
        return 1
    } else if (Player2Score >= 11) {
        return 2
    } else {
        return 0
    }
}
function Reset_Ball () {
    Ball.setPosition(80, 87)
    Ball.setVelocity(0, 0)
    Ball_holder = 0
    Shooting = false
    Marker_position = 0
    Green_Bar.setFlag(SpriteFlag.Invisible, true)
    Marker.setFlag(SpriteFlag.Invisible, true)
}
function CalculatePoints (PlayerNum: number) {
    if (PlayerNum == 1) {
        distance = Math.abs(player1.x - 152)
    } else if (false) {
        distance = Math.abs(player2.x - 8)
    }
    if (distance > 55) {
        return 2
    } else {
        return 1
    }
}
function Launch_Shot (PlayerNum: number) {
    if (Marker_position >= Green_zone_min && Marker_position <= Green_zone_max) {
        if (PlayerNum == 1) {
            Ball.setVelocity(60, -120)
        } else {
            Ball.setVelocity(-60, -120)
        }
    } else {
        if (PlayerNum == 1) {
            Ball.setVelocity(60 + randint(-40, 40), -60)
        } else {
            Ball.setVelocity(60 + randint(-40, 40), -60)
        }
    }
    Ball_holder = 0
    Shooting = false
}
controller.player1.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    if (Ball_holder == 1 && Shooting == false) {
        Shooting = true
        Marker_position = 0
        Marker_Direction = 1
        Green_Bar.setFlag(SpriteFlag.Invisible, false)
        Marker.setFlag(SpriteFlag.Invisible, false)
    } else if (Ball_holder == 1 && Shooting == true) {
        Launch_Shot(1)
        Green_Bar.setFlag(SpriteFlag.Invisible, true)
        Marker.setFlag(SpriteFlag.Invisible, true)
        if (Marker_position >= Green_zone_min && Marker_position <= Green_zone_max) {
            game.showLongText(Game_messages[0], DialogLayout.Bottom)
        } else {
            game.showLongText(Game_messages[3], DialogLayout.Bottom)
        }
    } else if (Ball_holder == 0) {
        if (Distance(player1, Ball) < 25) {
            Ball_holder = 1
        }
    }
})
function Jump_Ball () {
    Ball.setVelocity(0, -100)
    pause(500)
    Ball.setVelocity(0, 100)
    pause(500)
    Ball.setVelocity(0, 0)
}
let dy = 0
let dx = 0
let Marker: Sprite = null
let Green_Bar: Sprite = null
let Hoop_x: number[] = []
let Player_Names: string[] = []
let Game_messages: string[] = []
let Dribble: number[] = []
let Player1score = 0
let Player2Score = 0
let Ball_holder = 0
let Shooting = false
let Marker_position = 0
let Marker_Direction = 0
let Green_zone_max = 0
let Green_zone_min = 0
let Player1jump = false
let Player2jump = false
let dribble_Timer = 0
let Dribble_step = 0
let distance = 0
let PTS = 0
let Winner = 0
let Bounce_Offset = 0
let player2: Sprite = null
let player1: Sprite = null
let Ball: Sprite = null
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
    44444444444444444444ffff4444444444444444444444444444444444444444444444444444444f444444444444444444444444444444444444444444444444444444ffff4444444444444444444444
    444444444444444444444444fff4444444444444444444444444444444444444444444444444444f444444444444444444444444444444444444444444444444444fff44444444444444444444444444
    444444444444444444444444444f444444444444444444444444444444444444444444444444444f44444444444444444444444444444444444444444444444444f44444444444444444444444444444
    4444444444444444444444444444f44444444444444444444444444444444444444444444444444f4444444444444444444444444444444444444444444444444f444444444444444444444444444444
    44444444444444444444444444444f4444444444444444444444444444444444444444444444444f444444444444444444444444444444444444444444444444f4444444444444444444444444444444
    44444444444444444444444444444f4444444444444444444444444444444444444444444444444f444444444444444444444444444444444444444444444444f4444444444444444444444444444444
    444444444444444444444444444444f444444444444444444444444444444444444444444444444f44444444444444444444444444444444444444444444444f44444444444444444444444444444444
    4444444444444444444444444444444ff4444444444444444444444444444444444444444444444f4444444444444444444444444444444444444444444444f444444444444444444444444444444444
    444444444444444444444444444444444f444444444444444444444444444444444444444444444f44444444444444444444444444444444444444444444ff4444444444444444444444444444444444
    ddddd4444444444444444444444444444f444444444444444444444444444444444444444444444f44444444444444444444444444444444444444444444ff444444444444444444444444444444dddd
    ddddd44444444444444444444444444444f44444444444444444444444444444444444444444444f4444444444444444444444444444444444444444444f44444444444444444444444444444444dddd
    111dd44444444444444444444444444444f44444444444444444444444444444444444444444444f4444444444444444444444444444444444444444444f44444444444444444444444444444444dd11
    111dd44444444444444444444444444444f44444444444444444444444444444444444444444444f4444444444444444444444444444444444444444444f44444444444444444444444444444444dd11
    111dd444444444444444444444444444444f4444444444444444444444444444444444444444444f444444444444444444444444444444444444444444f444444444444444444444444444444444dd11
    111dd4444444444444444444444444444444f444444444444444444444444444444444444444444f44444444444444444444444444444444444444444f4444444444444444444444444444444444dd11
    111dd4444444444444444444444444444444f444444444444444444444444444444444444fffffffffffff44444444444444444444444444444444444f4444444444444444444444444444444444dd11
    111dd4444444444444444444444444444444f444444444444444444444444444444444444fffffffffffff44444444444444444444444444444444444f4444444444444444444444444444444444dd11
    111dd2222222222222444444444444444444f4444444444444444444444444444444444ff444444f444444ff444444444444444444444444444444444f4444444444444444444442222222222222dd11
    1112241144114114412244444444444444444f4444444444444444444444444444444ff44444444f44444444fff44444444444444444444444444444f444444444444444444442214411411441142211
    111dd22222222222224444444444444444444f44444444444444444444444444444ff4444444444f44444444444f4444444444444444444444444444f44444444444444444444442222222222222dd11
    111dd14411441441144444444444444444444f4444444444444444444444444444f444444444444f444444444444f444444444444444444444444444f44444444444444444444444114414411441dd11
    111dd411441141144444444444444444444444ff4444444444444444444444444f4444444444444f4444444444444f4444444444444444444444444f444444444444444444444444441141144114dd11
    111dd411441141144444444444444444444444ff444444444444444444444444f44444444444444f44444444444444f444444444444444444444444f444444444444444444444444441141144114dd11
    ddddd444114414444444444444444444444444ff444444444444444444444444f44444444444444f44444444444444f444444444444444444444444f444444444444444444444444444414411444dddd
    eee44444444444444444444444444444444444ff444444444444444444444444f44444444444444f44444444444444ff44444444444444444444444f44444444444444444444444444444444444444ee
    eeeffffffffffffffffffff444444444444444ff44444444444444444444444f444444444444444f444444444444444ff4444444444444444444444f444444444444444fffffffffffffffffffffffee
    eee44444444444444444f44fff444444444444ff44444444444444444444444f444444444444444f444444444444444ff4444444444444444444444f4444444444444ff44f44444444444444444444ee
    eee44444444444444444f44444f44444444444ff4444444444444444444444f4444444444444444f44444444444444444f444444444444444444444f44444444444ff4444f44444444444444444444ee
    eee44444444444444444f444444f4444444444ff4444444444444444444444f4444444444444444f44444444444444444f444444444444444444444f4444444444f444444f44444444444444444444ee
    eee44444444444444444f444444f4444444444ff4444444444444444444444f4444444444444444f44444444444444444f444444444444444444444f4444444444f444444f44444444444444444444ee
    eee44444444444444444f4444444f444444444ff4444444444444444444444f4444444444444444f44444444444444444f444444444444444444444f444444444f4444444f44444444444444444444ee
    eee44444444444444444f44444444f44444444ff4444444444444444444444f4444444444444444f44444444444444444f444444444444444444444f44444444f44444444f44444444444444444444ee
    eee44444444444444444f44444444f44444444ff4444444444444444444444f4444444444444444f44444444444444444f444444444444444444444f44444444f44444444f44444444444444444444ee
    eee44444444444444444f44444444f44444444ff4444444444444444444444f4444444444444444f44444444444444444f444444444444444444444f44444444f44444444f44444444444444444444ee
    eee44444444444444444f44444444f44444444ff4444444444444444444444f4444444444444444f44444444444444444f444444444444444444444f44444444f44444444f44444444444444444444ee
    eee44444444444444444f44444444f44444444ff4444444444444444444444f4444444444444444f44444444444444444f444444444444444444444f44444444f44444444f44444444444444444444ee
    eee44444444444444444f44444444f44444444ff4444444444444444444444f4444444444444444f44444444444444444f444444444444444444444f44444444f44444444f44444444444444444444ee
    eee44444444444444444f4444444f444444444ff4444444444444444444444f4444444444444444f44444444444444444f444444444444444444444f444444444f4444444f44444444444444444444ee
    eee44444444444444444f444444f4444444444ff4444444444444444444444f4444444444444444f44444444444444444f444444444444444444444f4444444444f444444f44444444444444444444ee
    eee44444444444444444f44444f4444444444f444444444444444444444444f4444444444444444f44444444444444444f4444444444444444444444f4444444444ff4444f44444444444444444444ee
    eee44444444444444444f444ff44444444444f4444444444444444444444444f444444444444444f444444444444444ff44444444444444444444444f444444444444ff44f44444444444444444444ee
    eee44444444444444444f44ff444444444444f4444444444444444444444444f444444444444444f444444444444444ff44444444444444444444444f444444444444ff44f44444444444444444444ee
    fffffffffffffffffffffff44444444444444f4444444444444444444444444f444444444444444f444444444444444ff44444444444444444444444f44444444444444fffffffffffffffffffffffff
    444444444444444444444444444444444444f444444444444444444444444444f44444444444444f44444444444444f44444444444444444444444444f44444444444444444444444444444444444444
    444444444444444444444444444444444444f444444444444444444444444444f44444444444444f44444444444444f44444444444444444444444444f44444444444444444444444444444444444444
    444444444444444444444444444444444444f4444444444444444444444444444f4444444444444f4444444444444f444444444444444444444444444f44444444444444444444444444444444444444
    44444444444444444444444444444444444f444444444444444444444444444444f444444444444f444444444444f44444444444444444444444444444f4444444444444444444444444444444444444
    44444444444444444444444444444444444f444444444444444444444444444444f444444444444f444444444444f44444444444444444444444444444f4444444444444444444444444444444444444
    4444444444444444444444444444444444f44444444444444444444444444444444ff4444444444f44444444444f4444444444444444444444444444444f444444444444444444444444444444444444
    4444444444444444444444444444444444f4444444444444444444444444444444444ff44444444f44444444fff44444444444444444444444444444444f444444444444444444444444444444444444
    444444444444444444444444444444444f4444444444444444444444444444444444444ff444444f444444ff444444444444444444444444444444444444ff4444444444444444444444444444444444
    444444444444444444444444444444444f444444444444444444444444444444444444444fffffffffffff44444444444444444444444444444444444444ff4444444444444444444444444444444444
    4444444444444444444444444444444ff4444444444444444444444444444444444444444444444f4444444444444444444444444444444444444444444444f444444444444444444444444444444444
    4444444444444444444444444444444ff4444444444444444444444444444444444444444444444f4444444444444444444444444444444444444444444444f444444444444444444444444444444444
    444444444444444444444444444444f444444444444444444444444444444444444444444444444f44444444444444444444444444444444444444444444444f44444444444444444444444444444444
    44444444444444444444444444444f4444444444444444444444444444444444444444444444444f444444444444444444444444444444444444444444444444f4444444444444444444444444444444
    4444444444444444444444444444f44444444444444444444444444444444444444444444444444f4444444444444444444444444444444444444444444444444f444444444444444444444444444444
    444444444444444444444444444f444444444444444444444444444444444444444444444444444f44444444444444444444444444444444444444444444444444f44444444444444444444444444444
    444444444444444444444444fff4444444444444444444444444444444444444444444444444444f444444444444444444444444444444444444444444444444444fff44444444444444444444444444
    444444444444444444444444fff4444444444444444444444444444444444444444444444444444f444444444444444444444444444444444444444444444444444fff44444444444444444444444444
    4444444444444444444444ff4444444444444444444444444444444444444444444444444444444f444444444444444444444444444444444444444444444444444444ff444444444444444444444444
    444444444444444444444f444444444444444444444444444444444444444444444444444444444f44444444444444444444444444444444444444444444444444444444f44444444444444444444444
    44444444444444444ffff4444444444444444444444444444444444444444444444444444444444f444444444444444444444444444444444444444444444444444444444ffff4444444444444444444
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    `)
Set_up()
Jump_Ball()
