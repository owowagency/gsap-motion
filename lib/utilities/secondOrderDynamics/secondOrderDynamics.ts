export class SecondOrderDynamics {
  private xp: number; // The previous input value
  private y: number; // The current position of the object
  private yd: number; // The current velocity of the object
  private readonly k1: number; // Constant derived from damping and speed, used in calculations
  private readonly k2: number; // Constant derived from speed, used in calculations
  private readonly k3: number; // Constant derived from response, damping and speed, used in calculations

  /**
   * Second Order Dynamics are a mathematical model that simulates the behavior of an object by considering forces, acceleration, velocity, and position.
   * It is used to create realistic animations by accurately representing the movement and forces acting on objects.
   * @param speed Defines the shape of the motion
   * @param damping Defines how the motion settles over time
   * @param response Defines the acceleration of the motion
   * @param x0 The initial value or starting point of the motion
   */
  constructor(speed = 1, damping = 1, response = 0, x0: number) {
    // Compute constants based on the provided parameters
    this.k1 = damping / (Math.PI * speed);
    this.k2 = 1 / (2 * Math.PI * speed * (2 * Math.PI * speed));
    this.k3 = (response * damping) / (2 * Math.PI * speed);

    // Initialize variables with the initial value
    this.xp = x0;
    this.y = x0;
    this.yd = 0;
  }

  /**
   * Calculates and applies the next position of the object based on the provided step and value.
   * @param step The step size used to calculate the next position. Typically, this is the delta time.
   * @param x The next value or target of the motion
   * @param xd Optional parameter to provide the velocity
   * @returns The updated position of the object
   */
  public update(step: number, x: number, xd?: number): number {
    if (xd === undefined) {
      // Estimate the velocity if no value is provided
      xd = (x - this.xp) / step;
      this.xp = x;
    }

    // Clamp k2 to ensure stability during framerate peaks, such as during lag spikes or at very high refresh rates
    const k2Stable = Math.max(this.k2, (step * step) / 2 + (step * this.k1) / 2, step * this.k1);

    // Update the position and velocity of the object
    this.y = this.y + step * this.yd;
    this.yd = this.yd + (step * (x + this.k3 * xd - this.y - this.k1 * this.yd)) / k2Stable; // Update velocity based on acceleration

    return this.y;
  }
}
