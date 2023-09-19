/**
 * Function that implements physics based motion, using the Second Order Dynamics model.
 * Second Order Dynamics are a mathematical model that simulates the behavior of an object by considering forces, acceleration, velocity, and position.
 * It is used to create realistic animations by accurately representing the movement and forces acting on objects.
 * @param speed Defines the shape of the motion (default 1)
 * @param damping Defines how the motion settles over time (default 1)
 * @param response Defines the acceleration of the motion (default 0)
 * @param x0 The initial value or starting point of the motion (default 0)
 */
export function createPhysicsBasedMotion(speed = 1, damping = 1, response = 0, x0 = 0) {
    // Compute constants based on the provided parameters
        const k1 = damping / (Math.PI * speed);
    const k2 = 1 / (2 * Math.PI * speed * (2 * Math.PI * speed));
    const k3 = (response * damping) / (2 * Math.PI * speed);

    // Initialize variables with the initial value
    let xp = x0;
    let y = x0;
    let yd = 0;

    /**
     * Calculates and applies the next position of the object based on the provided step and value.
     * @param step The step size used to calculate the next position. Typically, this is the delta time.
     * @param x The next value or target of the motion
     * @param xd Optional parameter to provide the velocity
     * @returns The updated position of the object
     */
    function update(step: number, x: number): number {
        // Estimate the velocity
        const xd = (x - xp) / step;

        // Clamp k2 to ensure stability during framerate peaks, such as during lag spikes or at very high refresh rates
        const k2Stable = Math.max(k2, (step * step) / 2 + (step * k1) / 2, step * k1);

        xp = x;

        // Update the position and velocity of the object
        y = y + step * yd;
        yd = yd + (step * (x + k3 * xd - y - k1 * yd)) / k2Stable; // Update velocity based on acceleration

        return y;
    }

    return Object.freeze({ update });
}

/**
 * @deprecated Deprecated; renamed to `createPhysicsBasedMotion`
 */
export const physicsBasedMotion = createPhysicsBasedMotion;

// legacy module
export { SecondOrderDynamics } from './secondOrderDynamics.legacy';
