//% color=#0fbc11 icon="\uf1b9" block="Line Follower"
namespace lineFollower {
    let leftSensorPin: AnalogPin;
    let rightSensorPin: AnalogPin;

    let whiteLeft: number;
    let blackLeft: number;
    let whiteRight: number;
    let blackRight: number;

    let leftSensorValue: number = 0;
    let rightSensorValue: number = 0;
    const ALPHA = 0.5; // Współczynnik wygładzania (między 0 a 1)

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

        whiteLeft = getFilteredReading(leftSensorPin, true);
        whiteRight = getFilteredReading(rightSensorPin, true);

        basic.showString("B");
        while (!input.buttonIsPressed(Button.B)) {
            basic.pause(100);
        }

        blackLeft = getFilteredReading(leftSensorPin, true);
        blackRight = getFilteredReading(rightSensorPin, true);

        basic.showIcon(IconNames.Yes);
    }

    //% blockId=line_follower_read_left block="read left sensor"
    //% weight=80
    export function readLeftSensor(): number {
        return Math.round(getFilteredReading(leftSensorPin, false));
    }

    //% blockId=line_follower_read_right block="read right sensor"
    //% weight=80
    export function readRightSensor(): number {
        return Math.round(getFilteredReading(rightSensorPin, false));
    }

    //% blockId=line_follower_is_on_line block="is on line %sensor"
    //% weight=70
    export function isOnLine(sensor: LineFollowerSensor): boolean {
        let sensorValue: number;
        let whiteValue: number;
        let blackValue: number;

        if (sensor === LineFollowerSensor.Left) {
            sensorValue = Math.round(getFilteredReading(leftSensorPin, false));
            whiteValue = whiteLeft;
            blackValue = blackLeft;
        } else {
            sensorValue = Math.round(getFilteredReading(rightSensorPin, false));
            whiteValue = whiteRight;
            blackValue = blackRight;
        }

        return (sensorValue > whiteValue && sensorValue < blackValue);
    }

    function getFilteredReading(pin: AnalogPin, isCalibration: boolean): number {
        let currentValue = pins.analogReadPin(pin);

        if (pin === leftSensorPin) {
            if (isCalibration) {
                leftSensorValue = currentValue;
            } else {
                leftSensorValue = ALPHA * currentValue + (1 - ALPHA) * leftSensorValue;
            }
            return leftSensorValue;
        } else {
            if (isCalibration) {
                rightSensorValue = currentValue;
            } else {
                rightSensorValue = ALPHA * currentValue + (1 - ALPHA) * rightSensorValue;
            }
            return rightSensorValue;
        }
    }

    // Enum for sensors
    export enum LineFollowerSensor {
        //% block="left"
        Left,
        //% block="right"
        Right
    }
}
