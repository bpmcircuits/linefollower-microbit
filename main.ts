lineFollower.create(AnalogPin.P0, AnalogPin.P1);
lineFollower.calibrate();

basic.forever(function() {

    serial.writeLine("Sensor left: " + lineFollower.isOnLine(lineFollower.LineFollowerSensor.Left));
    serial.writeLine("Sensor right: " + lineFollower.isOnLine(lineFollower.LineFollowerSensor.Right));

    pause(200);
});
