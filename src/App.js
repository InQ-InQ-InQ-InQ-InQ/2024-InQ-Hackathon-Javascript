import { Console } from "@woowacourse/mission-utils";
import { MissionUtils } from "@woowacourse/mission-utils";

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
      return names;
    } catch (error) {
      // reject 되는 경우
    }
  }

  async getTimes() {
    try {
      const input = await Console.readLineAsync("시도할 횟수는 몇 회인가요?\n");
      const times = parseInt(input);
      return times;
    } catch (error) {
      // reject 되는 경우
    }
  }
}

export default App;
