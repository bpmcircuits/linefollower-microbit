let lineFollowerLeft: number = 0;
let lineFollowerRight: number = 0;

basic.forever(function() {

    lineFollowerLeft = pins.analogReadPin(AnalogPin.P0);
    lineFollowerRight = pins.analogReadPin(AnalogPin.P1);

    serial.writeLine("Left line value: " + lineFollowerLeft);
    serial.writeLine("Right line value: " + lineFollowerRight);

    pause(100);
});
