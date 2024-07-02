//% color=#0fbc11 icon="\uf1b9" block="Line Follower"
namespace lineFollower {
    let leftSensorPin: AnalogPin;
    let rightSensorPin: AnalogPin;

    let whiteLeft: number;
    let blackLeft: number;
    let whiteRight: number;
    let blackRight: number;

    //% blockId=line_follower_create block="create line follower with left sensor at %leftPin|and right sensor at %rightPin"
    //% weight=100 blockSetVariable=lineFollower
    export function create(leftPin: AnalogPin, rightPin: AnalogPin): void {
        leftSensorPin = leftPin;
        rightSensorPin = rightPin;
    }

    //% blockId=line_follower_calibrate block="calibrate sensors"
    //% weight=90
    export function calibrate(): void {
        basic.showString("W");
        while (!input.buttonIsPressed(Button.A)) {
            basic.pause(100);
        }

        whiteLeft = pins.analogReadPin(leftSensorPin);
        whiteRight = pins.analogReadPin(rightSensorPin);

        basic.showString("B");
        while (!input.buttonIsPressed(Button.B)) {
            basic.pause(100);
        }

        blackLeft = pins.analogReadPin(leftSensorPin);
        blackRight = pins.analogReadPin(rightSensorPin);

        basic.showIcon(IconNames.Yes);
    }

    //% blockId=line_follower_read_left block="read left sensor"
    //% weight=80
    export function readLeftSensor(): number {
        return pins.analogReadPin(leftSensorPin);
    }

    //% blockId=line_follower_read_right block="read right sensor"
    //% weight=80
    export function readRightSensor(): number {
        return pins.analogReadPin(rightSensorPin);
    }

    //% blockId=line_follower_is_on_line block="is on line"
    //% weight=70
    export function isOnLine(): boolean {
        let leftValue = pins.analogReadPin(leftSensorPin);
        let rightValue = pins.analogReadPin(rightSensorPin);

        let leftOnLine = (leftValue > whiteLeft && leftValue < blackLeft);
        let rightOnLine = (rightValue > whiteRight && rightValue < blackRight);

        return leftOnLine || rightOnLine;
    }
}
