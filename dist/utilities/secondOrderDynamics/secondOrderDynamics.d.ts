/**
 * Function that implements physics based motion, using the Second Order Dynamics model.
 * Second Order Dynamics are a mathematical model that simulates the behavior of an object by considering forces, acceleration, velocity, and position.
 * It is used to create realistic animations by accurately representing the movement and forces acting on objects.
 * @param speed Defines the shape of the motion (default 1)
 * @param damping Defines how the motion settles over time (default 1)
 * @param response Defines the acceleration of the motion (default 0)
 * @param x0 The initial value or starting point of the motion (default 0)
 */
export declare function createPhysicsBasedMotion(speed?: number, damping?: number, response?: number, x0?: number): Readonly<{
    update: (step: number, x: number) => number;
}>;
/**
 * @deprecated Deprecated; renamed to `createPhysicsBasedMotion`
 */
export declare const physicsBasedMotion: typeof createPhysicsBasedMotion;
export { SecondOrderDynamics } from './secondOrderDynamics.legacy';
