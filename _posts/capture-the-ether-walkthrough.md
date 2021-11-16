---
title: "Capture the Ether CTF Walkthrough - Part 1"
date: '2021-11-15'
coverImage: "/blog/eth-flag.jpg"
ogImage:
  url: "/blog/eth-flag.jpg"
---


Capture the Ether is an Ethereum Security CTF. I would recommend starting with [Ethernaut](https://paulbenoit.com/posts/ethernaut-walkthrough) if this is your first Ethereum CTF because it's more beginner-friendly.

## Setup

You should have a dedicated [Metamask](https://metamask.io/) wallet for testing. To play Capture the Ether, we need to set Metamask to use the Ropsten Test Network and we need to get some test ETH on Ropsten. There are several faucets where you can request Ropsten ETH. [This](https://faucet.dimensions.network/) is the one I used.

Adding to the complexity of the CTF, there are many tools you can use to complete each challenge. In this walkthrough we're mainly going to be using [Remix](https://remix.ethereum.org/).

## Warmup

### Deploy a Contract

There is nothing to write for this challenge. It's designed to make sure that you are setup correctly with Metamask. Follow the setup steps above and you should pass.

### Call Me

This challenge tests calling a function in a contract on Ethereum. First we should paste the challenge's code into a new file in Remix. Then we need to select *Injected Web3* so Remix knows to use Ropsten Test Network, which is what our Metamask wallet is set to use.

Next, we paste our contract's address into the *At Address* field in Remix and click the *At Address* button. We should see the contract's functions display as buttons on the lower left hand side of the screen. Click the *callme* button to call the function.

![Screenshot of Remix](/blog/capture-the-ether2.png)

That's it. Validate the answer on Capture the Ether. You can check that *isComplete* is set to *True* by looking at the contract on [Etherscan](https://ropsten.etherscan.io/).

### Set a Nickname

```jsx
function setNickname(bytes32 nickname) public {
        nicknameOf[msg.sender] = nickname;
    }
```

To set a nickname, we need to call *setNickname()* with the username we want to have.

Notice that *setNickname* only takes *bytes32* as the parameter. We need to convert our name (which is a string) into bytes32. For that we can use [this converter](https://profitplane.com/str-to-bytes32).

Then we pass that value into *setNickname* in Remix.

# Lottery

### Guess the Number

```jsx
pragma solidity ^0.4.21;

contract GuessTheNumberChallenge {
    uint8 answer = 42;

    function GuessTheNumberChallenge() public payable {
        require(msg.value == 1 ether);
    }

    function isComplete() public view returns (bool) {
        return address(this).balance == 0;
    }

    function guess(uint8 n) public payable {
        require(msg.value == 1 ether);

        if (n == answer) {
            msg.sender.transfer(2 ether);
        }
    }
}
```

We can see that the answer is hardcoded as *42* in this contract. To win, we need to call the the *guess* function and pass *42* as the parameter.

The contract requires 1 ether to guess, so make sure you select 1 ETH in the *Value* field in Remix when you call the function.

### Guess the Secret Number

This time the answer is hashed with *keccack256*. Ideally, hashes are one-way functions, so they should not be able to be reversed. In this case though, we know that the answer is still a *uint8*

That means it is an 8 bit integer, and 8 bits can only contain 256 possible integers. We can easily brute force this. Because we know the hash, we don't need to spend 1 ETH per guess. We could write the brute force function in Solidity in Remix, deploy our own contract, and call it. Instead, I wrote a quick brute forcer in Go and ran it locally on my computer.

```go
package main

import (
	"fmt"

	"github.com/ethereum/go-ethereum/crypto"
)

// answerHash = 0xdb81b4d58595fbbbb592d3661a34cdca14d7ab379441400cbfa1b78bc447c365

func main() {
	for i := 0; i < 256; i++ {
		b := uint8(i)
		num := []byte{b}
		hash := crypto.Keccak256Hash(num)
		hex := hash.Hex()
		if hex == "0xdb81b4d58595fbbbb592d3661a34cdca14d7ab379441400cbfa1b78bc447c365" {
			fmt.Println("answer: ", num)
			return
		}
	}
	fmt.Println("this ain't it")
}
```

The answer is *170*

### Guess the random number

The relevant line is below

```jsx
answer = uint8(keccak256(block.blockhash(block.number - 1), now));
```

To calculate the answer we need two things:

1. The block number of the previous block
2. [now](https://docs.soliditylang.org/en/v0.4.21/units-and-global-variables.html), which is the timestamp of the deployed contract

Luckily, both of these are public.

There's an easier way though. *answer* is a public, global variable. It isn't stored on the blockchain like the previous items. Instead it's stored in EVM storage. We can use Etherscan to view EVM state changes.

 First we have to go to the creation transaction on Etherscan. This is the second address in the *Creator* field. Click it.

![Screenshot of Etherscan](/blog/capture-the-ether3.png)

![Screenshot of Etherscan and password](/blog/capture-the-ether4.png)

We can see that there was only one variable changed in the EVM state for our contract's address. We can change the type from *Hex* to *Num* and we have our answer.

### Guess the new number

The contract is still using the previous block number and the *now* variable, but this time it's calculated when we call *guess()*  instead of when the contract is created. 

```jsx
pragma solidity ^0.4.21;

contract GuessTheNewNumberChallenge {
    function GuessTheNewNumberChallenge() public payable {
        require(msg.value == 1 ether);
    }

    function isComplete() public view returns (bool) {
        return address(this).balance == 0;
    }

    function guess(uint8 n) public payable {
        require(msg.value == 1 ether);
        uint8 answer = uint8(keccak256(block.blockhash(block.number - 1), now));

        if (n == answer) {
            msg.sender.transfer(2 ether);
        }
    }
}
```

Since *answer* isn't static anymore we can't get the answer and submit it later. We have to make sure we get the answer and submit it within the same block. We can do this by creating a second, proxy smart contract.

```jsx
// put this in the same file as the original contract. Deploy it separately
contract solution {
    function() public payable {}
    
    function destroy() public { 
        selfdestruct(msg.sender);
    }

    function attack() public payable {
        // this address is the address of the original contract.
        // It should match the one shown on Capture the Ether and on the "At Address" field in Remix.
        address contractAddr = 0xeA68B9fd3c9c681C9725F573cea7441e07aC1DB6;
        uint8 answer = uint8(keccak256(block.blockhash(block.number - 1), now));
        GuessTheNewNumberChallenge c = GuessTheNewNumberChallenge(contractAddr);
        c.guess.value(1 ether)(answer);
    }
}
```

This second contract calculates the answer using the same formula as the original contract. Then it calls the original contract, passing the answer to *guess*. Because it calls the original contract, we know it will be mined within the same block, so it will have the same value for *answer*.


