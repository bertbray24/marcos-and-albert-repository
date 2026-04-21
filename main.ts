namespace SpriteKind {
    export const UI = SpriteKind.create()
}
/**
 * This Is our unit 5 project. Functions with parameters and return values are used in Launch_Shot, CalculatePoints, Award_Points, and Distance, each taking inputs and returning or producing results based on those values. Conditional statements and boolean operators appear in the blocking mechanic and shooting state system using if and else if chains combined with and and or logic. User input is handled through the Keybinds extension which remaps keyboard controls so both players can play simultaneously on the same keyboard. The game update loop iterates every frame handling ball physics, dribble animation, and win checking. Arrays store dribble offsets, player names, and game messages that are accessed by index throughout the game. Two players compete with independent scores tracked and displayed through the Info extension. A tile map loads the court and defines the play area boundaries. The Info extension serves as the existing extension for live score display on screen, while the custom Keybinds extension by Brohann3214 is the user-added extension that solves MakeCode's default single-player input limitation and enables true simultaneous two-player keyboard gameplay.
 */
// This two-player basketball game It our Unit 5 project. Functions with parameters and return values are used in Launch_Shot, CalculatePoints, Award_Points, and Distance, each taking inputs and returning or producing results based on those values. Conditional statements and boolean operators appear in the blocking mechanic and shooting state system using if and else if chains combined with and and or logic. User input is handled through the Keybinds extension which remaps keyboard controls so both players can play simultaneously on the same keyboard. The game update loop iterates every frame handling ball physics, dribble animation, and win checking. Arrays store dribble offsets, player names, and game messages that are accessed by index throughout the game. Two players compete with independent scores tracked and displayed through the Info extension. A tile map loads the court and defines the out of bounds. The Info extension serves as the existing extension for live score display on screen, while the custom Keybinds extension by Brohann3214 is the user-added extension that solves MakeCodes default single-player input limitation and enables true simultaneous two-player keyboard gameplay.
function Jump_Ball () {
    jump_ball_active = true
    ball_following = true
    Ball.setPosition(80, 40)
    Ball.setVelocity(0, 0)
    pause(300)
    ball_following = false
    Ball.setVelocity(0, 50)
    pause(800)
    jump_ball_active = false
}
function Launch_Shot (PlayerNum: number) {
    if (Marker_position >= Green_zone_min && Marker_position <= Green_zone_max) {
        if (PlayerNum == 1) {
            Ball.setVelocity(65, -110)
            Ball.follow(Hoop_Right, 100)
            ball_following = true
        } else {
            Ball.setVelocity(-65, -110)
            Ball.follow(Hoop_Left, 100)
            ball_following = true
        }
    } else {
        if (PlayerNum == 1) {
            Ball.setVelocity(60 + randint(-40, 40), -100)
        } else {
            Ball.setVelocity(-60 + randint(-40, 40), -100)
        }
    }
    Ball_holder = 0
    Shooting = false
}
function Award_Points (playernum: number, points: number) {
    if (playernum == 1) {
        Player1score = Player1score + points
        info.player1.setScore(Player1score)
    } else {
        Player2Score = Player2Score + points
        info.player2.setScore(Player2Score)
    }
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
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
function Distance (spriteA: Sprite, SpriteB: Sprite) {
    dx = spriteA.x - SpriteB.x
    dy = spriteA.y - SpriteB.y
    return Math.sqrt(dx * dx + dy * dy)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.UI, function (sprite, otherSprite) {
    if (otherSprite == Hoop_Right && Ball_holder == 0) {
        PTS = CalculatePoints(1)
        Award_Points(1, PTS)
        Ball.setVelocity(0, 80)
        pause(300)
        if (PTS == 2) {
            player1.sayText("3-POINTER!!", 1500, false)
        } else {
            player1.sayText("Scores!!!", 1500, false)
        }
        Reset_Ball()
        Jump_Ball()
    }
    if (otherSprite == Hoop_Left && Ball_holder == 0) {
        PTS = CalculatePoints(2)
        Award_Points(2, PTS)
        Ball.setVelocity(0, 80)
        pause(300)
        if (PTS == 2) {
            player2.sayText("3-POINTER!!", 1500, false)
        } else {
            player2.sayText("Scores!!!", 1500, false)
        }
        Reset_Ball()
        Jump_Ball()
    }
})
function CalculatePoints (PlayerNum: number) {
    if (PlayerNum == 1) {
        distance = Math.abs(shot_x - 152)
    } else if (PlayerNum == 2) {
        distance = Math.abs(shot_x - 8)
    }
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
        } else if (sprite == player2) {
            Ball_holder = 2
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
    Hoop_Left = sprites.create(img`
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
    Hoop_Left.setPosition(17, 74)
    Hoop_Left.setFlag(SpriteFlag.Invisible, true)
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
    jump_ball_active = false
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
    Winner = 0
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
    Player2jump = false
    blocked = false
}
let Player2jump = false
let Hoop_x: number[] = []
let Player_Names: string[] = []
let Game_messages: string[] = []
let Dribble: number[] = []
let dribble_Timer = 0
let Dribble_step = 0
let Winner = 0
let Bounce_Offset = 0
let blocked = false
let Player1jump = false
let Marker_Direction = 0
let Marker: Sprite = null
let Green_Bar: Sprite = null
let shot_x = 0
let distance = 0
let player2: Sprite = null
let player1: Sprite = null
let PTS = 0
let dy = 0
let dx = 0
let Player2Score = 0
let Player1score = 0
let Shooting = false
let Ball_holder = 0
let Hoop_Left: Sprite = null
let Hoop_Right: Sprite = null
let Green_zone_max = 0
let Green_zone_min = 0
let Marker_position = 0
let Ball: Sprite = null
let ball_following = false
let jump_ball_active = false
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
Keybinds.setSimulatorKeymap(
Keybinds.PlayerNumber.ONE,
Keybinds.CustomKey.UP,
Keybinds.CustomKey.DOWN,
Keybinds.CustomKey.LEFT,
Keybinds.CustomKey.RIGHT,
Keybinds.CustomKey.M,
Keybinds.CustomKey.P
)
game.splash("BASKETBALL - Same keyboard, 2 players! First to 11 wins!")
game.splash("PLAYER 1 (RED): Arrow keys to move | M = Pickup/Shoot | P = Jump/Block")
game.splash("PLAYER 2 (BLUE): W A S D to move | Q = Pickup/Shoot | E = Jump/Block")
game.splash("Stop the marker in the GREEN zone to score! Miss = random shot")
Set_up()
Jump_Ball()
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
    if (Ball_holder == 1 || Ball_holder == 2) {
        dribble_Timer = dribble_Timer + 1
        if (dribble_Timer >= 4) {
            dribble_Timer = 0
            Dribble_step = (Dribble_step + 1) % 8
        }
        Bounce_Offset = Dribble[Dribble_step]
        if (Ball_holder == 1) {
            Ball.setPosition(player1.x + 8, player1.y + Bounce_Offset)
        } else {
            Ball.setPosition(player2.x - 8, player2.y + Bounce_Offset)
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
    if (Player2jump == true && (player2.y >= 90 && player2.vy >= 0)) {
        player2.y = 90
        player2.vy = 0
        Player2jump = false
    }
    if (Player1jump == true && (blocked == false && (Distance(player1, Ball) < 22 && (Ball_holder == 0 || ball_following == true))) && (Math.abs(Ball.vx) > 20 || Math.abs(Ball.vy) > 20) && jump_ball_active == false) {
        Ball.unfollow()
        ball_following = false
        blocked = true
        Ball.setVelocity(randint(-70, 70), randint(-90, -40))
        player1.sayText("BLOCKED!", 1500, false)
    }
    if (Player2jump == true && (blocked == false && (Distance(player2, Ball) < 22 && (Ball_holder == 0 || ball_following == true))) && (Math.abs(Ball.vx) > 20 || Math.abs(Ball.vy) > 20) && jump_ball_active == false) {
        Ball.unfollow()
        ball_following = false
        blocked = true
        Ball.setVelocity(randint(-70, 70), randint(-90, -40))
        player2.sayText("BLOCKED!", 1500, false)
    }
    if (Winner == 0) {
        Winner = Check_Winner()
    }
    if (Winner != 0) {
        game.splash("" + Player_Names[Winner - 1] + " WINS!!")
        game.gameOver(true)
    }
})
