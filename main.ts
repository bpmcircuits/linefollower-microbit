lineFollower.create(AnalogPin.P0, AnalogPin.P1);
lineFollower.calibrate();

basic.forever(function() {

    serial.writeLine("Sensor left: " + lineFollower.readLeftSensor());
    serial.writeLine("Sensor right: " + lineFollower.readRightSensor());

    pause(100);
});
