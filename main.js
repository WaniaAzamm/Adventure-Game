#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
console.log(chalk.bold.yellow("\n\n----------------WELCOME TO ADVENTURE GAME!!!-----------------\n\n"));
while (true) {
    let playerName = await inquirer.prompt({
        name: "name",
        type: "input",
        message: "Enter your Name?",
    });
    console.log(chalk.bold.green(`Welcome, ${playerName.name}`));
    let opponentName = "";
    while (opponentName === "") {
        let opponentChoice = await inquirer.prompt({
            name: "select",
            type: "list",
            message: "Please Select your Opponent!!",
            choices: ["Skeleton", "Zombie", "Skullcrush"],
        });
        opponentName = opponentChoice.select;
    }
    console.log(chalk.bold.blueBright(`Your Selected Opponent is, ${opponentName}`));
    console.log(chalk.bold.magentaBright(`${playerName.name} vs ${opponentName}`));
    let playerFuel = 100;
    let opponentFuel = 100;
    while (true) {
        let action = await inquirer.prompt({
            name: "whattodo",
            type: "list",
            message: "What do you want to do?",
            choices: ["Run", "Drink potion", "Attack"],
        });
        if (action.whattodo === "Run") {
            console.log(chalk.bold.red("You lose, Better luck next time"));
            break;
        }
        else if (action.whattodo === "Drink potion") {
            console.log(chalk.bold.green(`You drink a health potion. Your fuel is ${playerFuel}`));
            playerFuel = 100;
        }
        else if (action.whattodo === "Attack") {
            let num = Math.floor(Math.random() * 2);
            if (num > 0) {
                playerFuel -= 25;
                console.log(chalk.bold.red(`${playerName.name} fuel = ${playerFuel}`));
                console.log(chalk.bold.green(`${opponentName} fuel = ${opponentFuel}`));
                if (playerFuel <= 0) {
                    console.log(chalk.bold.red("You lose, Better luck next time"));
                    break;
                }
            }
            else {
                opponentFuel -= 25;
                console.log(chalk.bold.red(`${opponentName} fuel = ${opponentFuel}`));
                console.log(chalk.bold.green(`${playerName.name} fuel = ${playerFuel}`));
                if (opponentFuel <= 0) {
                    console.log(chalk.bold.green("You win!"));
                    break;
                }
            }
        }
    }
    let continueGame = await inquirer.prompt({
        name: "continue",
        type: "confirm",
        message: "Do you want to continue playing?",
    });
    if (!continueGame.continue) {
        console.log(chalk.bold.red("Thanks for playing!"));
        break;
    }
    else {
        console.log(chalk.bold.green("Starting a new game..."));
    }
}
