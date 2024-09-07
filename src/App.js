import { Console } from "@woowacourse/mission-utils";
import { MissionUtils } from "@woowacourse/mission-utils";

class InputError extends Error {
  constructor(message) {
    super(message);
    this.name = "[ERROR]";
  }
}

class App {
  async play() {
    const names = await this.getCarname();
    const times = await this.getTimes();
    const race = Array(names.length).fill(0);
    let max = 0;

    Console.print("\n실행 결과");

    for (let i = 0; i < times; i++) {
      names.forEach((name, index, array) => {
        race[index] =
          MissionUtils.Random.pickNumberInRange(0, 9) >= 4
            ? race[index] + 1
            : race[index];
        max = race[index] > max ? race[index] : max;
        Console.print(`${name} : ${"-".repeat(race[index])}`);
      });
      Console.print("");
    }

    Console.print(
      `최종 우승자 : ${names
        .filter((name) => race[names.indexOf(name)] >= max)
        .join(", ")}`
    );
  }
  async getCarname() {
    try {
      const input = await Console.readLineAsync(
        "경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n"
      );
      const names = Array.from(input.split(",").map((name) => name.trim()));
      if (names.length < 2) {
        throw new InputError(
          "이름을 올바르게 입력해 주세요. (쉼표로 구분, 2개 이상의 이름)\n"
        );
      }
      return names;
    } catch (error) {
      if (error instanceof InputError) {
        throw error;
      }
      throw error;
    }
  }

  async getTimes() {
    try {
      const input = await Console.readLineAsync("시도할 횟수는 몇 회인가요?\n");
      const times = parseInt(input);
      if (!isNaN(input)) {
        throw new InputError("시도할 횟수는 숫자로 입력하세요.");
      }
      return times;
    } catch (error) {
      if (error instanceof InputError) {
        throw error;
      }
      throw error;
    }
  }
}

export default App;
