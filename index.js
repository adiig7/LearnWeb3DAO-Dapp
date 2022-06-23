const provider = new ethers.providers.Web3Provider(window.ethereum, "rinkeby");
const MoodContractAddress = "0x98fA665D7cFC29c8348847F832BB20138fD1B66a";
const MoodContractABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_mood",
        type: "string",
      },
    ],
    name: "setMood",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getMood",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
let MoodContract;
let signer;
provider.send("eth_requestAccounts", []).then(() => {
  provider.listAccounts().then(function (accounts) {
    signer = provider.getSigner(accounts[0]);
    MoodContract = new ethers.Contract(
      MoodContractAddress,
      MoodContractABI,
      signer
    );
  });
});
async function getMood() {
  const getMoodPromise = MoodContract.getMood();
  const Mood = await getMoodPromise;
  console.log(Mood);
  document.getElementById("your_mood").innerHTML = Mood;
}
async function setMood() {
  const mood = document.getElementById("input").value;
  const setMoodPromise = MoodContract.setMood(mood);
  await setMoodPromise;
  document.getElementById("input").value = "";
}
