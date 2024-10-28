import confetti from 'canvas-confetti'

interface IConfettiParams {
  decay?: number
  gravity?: number
  particleCount?: number
  spread?: number
  startVelocity?: number
}

export const useConfetti = () => {
  return {
    cannon: (params: IConfettiParams) => confetti(params),
  }
}
