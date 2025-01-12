export class RandomNumberGenerator {
  generate(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}
