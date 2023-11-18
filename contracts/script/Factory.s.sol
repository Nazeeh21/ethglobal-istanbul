// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

import {Script, console2} from "../lib/forge-std/src/Script.sol";

contract FactoryScript is Script {
    function setUp() public {}

    function run() public {
        vm.broadcast();
    }
}
