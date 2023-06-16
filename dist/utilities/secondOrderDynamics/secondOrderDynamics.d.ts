export declare class SecondOrderDynamics {
    private xp;
    private y;
    private yd;
    private readonly k1;
    private readonly k2;
    private readonly k3;
    /**
     * Second Order Dynamics is a mathematical model that simulates object behavior by considering forces, acceleration, velocity, and position. It enables realistic animations by accurately representing movement and forces acting on objects.
     * @param frequency Shape of the resulting motion
     * @param damping Shape of settling of motion
     * @param response Acceleration of the motion
     * @param x0 Initial value
     */
    constructor(frequency: number | undefined, damping: number | undefined, response: number | undefined, x0: number);
    /**
     * Calculate and apply next position
     * @param step Step to calculate next position. For example; delta time.
     * @param x Next value
     * @param xd Optional velocity
     * @returns
     */
    update(step: number, x: number, xd?: number): number;
}
