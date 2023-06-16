export class SecondOrderDynamics {
  private xp: number; // previous input
  private y: number; // position
  private yd: number; // velocity
  private readonly k1: number; // dynamics constant
  private readonly k2: number; // dynamics constant
  private readonly k3: number; // dynamics constant

  /**
   * Second Order Dynamics is a mathematical model that simulates object behavior by considering forces, acceleration, velocity, and position. It enables realistic animations by accurately representing movement and forces acting on objects.
   * @param frequency Shape of the resulting motion
   * @param damping Shape of settling of motion
   * @param response Acceleration of the motion
   * @param x0 Initial value
   */
  constructor(frequency = 1, damping = 1, response = 0, x0: number) {
    // compute constants
    this.k1 = damping / (Math.PI * frequency);
    this.k2 = 1 / (2 * Math.PI * frequency * (2 * Math.PI * frequency));
    this.k3 = (response * damping) / (2 * Math.PI * frequency);

    // initialize variables
    this.xp = x0;
    this.y = x0;
    this.yd = 0;
  }

  /**
   * Calculate and apply next position
   * @param step Step to calculate next position. For example; delta time.
   * @param x Next value
   * @param xd Optional velocity
   * @returns
   */
  public update(step: number, x: number, xd?: number): number {
    if (xd === undefined) {
      // estimate velocity if no value is given
      xd = (x - this.xp) / step;
      this.xp = x;
    }

    // clamp k2 to guarantee stability at framerate peaks,
    // for example lag spikes -- or futuristically high refresh rates in the distant future 8)
    const k2Stable = Math.max(this.k2, (step * step) / 2 + (step * this.k1) / 2, step * this.k1);

    // integrate position by velocity
    this.y = this.y + step * this.yd;
    this.yd = this.yd + (step * (x + this.k3 * xd - this.y - this.k1 * this.yd)) / k2Stable; // integrate velocity by acceleration

    return this.y;
  }
}
