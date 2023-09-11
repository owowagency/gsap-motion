/**
 * @deprecated Deprecated in favour of `physicsBasedMotion`
 * Second Order Dynamics are a mathematical model that simulates the behavior of an object by considering forces, acceleration, velocity, and position.
 * It is used to create realistic animations by accurately representing the movement and forces acting on objects.
 * @param speed Defines the shape of the motion
 * @param damping Defines how the motion settles over time
 * @param response Defines the acceleration of the motion
 * @param x0 The initial value or starting point of the motion
 */
export declare class SecondOrderDynamics {
    private xp;
    private y;
    private yd;
    private readonly k1;
    private readonly k2;
    private readonly k3;
    constructor(speed?: number, damping?: number, response?: number, x0?: number);
    /**
     * Calculates and applies the next position of the object based on the provided step and value.
     * @param step The step size used to calculate the next position. Typically, this is the delta time.
     * @param x The next value or target of the motion
     * @param xd Optional parameter to provide the velocity
     * @returns The updated position of the object
     */
    update(step: number, x: number, xd?: number): number;
}
