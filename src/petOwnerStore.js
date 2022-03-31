import {
  action,
  autorun,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

class PetOwnerStore {
  pets = []; // 빈려동물
  owners = []; // 보호자

  constructor() {
    // observable, action, computed 상태로 만들어 줌
    makeObservable(this, {
      pets: observable,
      owners: observable,
      createPet: action,
      createOwner: action,
      updatePet: action,
      updateOwner: action,
      deletePet: action,
      deleteOwner: action,
      totalPets: computed,
      totalOwners: computed,
      storeDetails: computed,
      getPetsByOwner: action,
      assignOwnerToPet: action,
    });
    // autorun(() => logStoreDetails) // logStoreDetails is not defined
    autorun(() => {
      console.log(this.storeDetails); // logStoreDetails 함수였음
    });
    runInAction(this.prefetchData);
  }
  // logStoreDetails() {
  //     console.log(this.storeDetails);
  //   }

  prefetchData = () => {
    const owners = [{ firstName: "Aleem", lastName: "Isiaka", id: 1 }];
    const pets = [
      {
        id: 1,
        name: "Lincy",
        breed: "Siamese",
        type: "Cat",
        ownerId: 1,
      },
    ];

    setTimeout(() => {
      console.log("Fetch complete update store");
      owners.map((pet) => this.createOwner(pet));
      pets.map((pet) => {
        this.createPet(pet);
        this.assignOwnerToPet(pet.ownerId, pet.id);
        return pet;
      });
    }, 3000);
  };

  // * 생성 관련
  // createPet : pet 객체를 생성하고 this.pets에 넣어줌
  createPet(pet = { id: 0, name: "", type: "", breed: "", owner: null }) {
    this.pets.push(pet);
  }
  // createOwner : owner 객체 생성하고 this.owners에 넣어줌
  createOwner(owner = { id: 0, firstName: "", lastName: "" }) {
    this.owners.push(owner);
  }

  // * 업데이트 관련
  // updateOwner : 받아온 ownerId를 통해 보호자를 찾아서 보호자의 id를 update로 수정
  updateOwner(ownerId, update) {
    const ownerIndexAtId = this.owners.findIndex(
      (owner) => owner.id === ownerId
    );
    if (ownerIndexAtId > -1 && update) {
      this.owners[ownerIndexAtId] = update;
    }
  }
  // updatePet : 받아온 petId를 통해 동물을 찾아서 동물의 id를 update로 수정
  updatePet(petId, update) {
    const petIndexAtId = this.pets.findIndex((pet) => pet.id === petId);
    if (petIndexAtId > -1 && update) {
      this.pets[petIndexAtId] = update;
    }
  }

  // * 삭제 관련
  // deletePet : 받아온 petId를 통해 pets에서 삭제
  deletePet(petId) {
    const petIndexAtId = this.pets.findIndex((pet) => pet.id === petId);
    if (petIndexAtId > -1) {
      this.pets.splice(petIndexAtId, 1);
    }
  }
  // deleteOwner : 받아온 ownerId를 통해 owners에서 삭제
  deleteOwner(ownerId) {
    const ownerIndexAtId = this.owners.findIndex(
      (owner) => owner.id === ownerId
    );
    if (ownerIndexAtId > -1) {
      this.owners.splice(ownerIndexAtId, 1);
    }
  }
  // * getter 함수
  // totalOwners : 보호자 몇명인지 리턴
  get totalOwners() {
    return this.owners.length;
  }
  // totalPets : 동물 몇마리인지 리턴
  get totalPets() {
    return this.pets.length;
  }
  //  storeDetails : 몇마리, 몇명의 보호자인지 리턴
  get storeDetails() {
    return `We have ${this.totalPets} total pets and ${this.totalOwners} total owners, so far!!!`;
  }
  logStoreDetails() {
    console.log(this.storeDetails);
  }

  // getPetsByOwner : 보호자가 어떤 동물을 데리고 있는지 리턴
  getPetsByOwner(ownerId) {
    return this.pets.filter((pet) => {
      return pet.owner && pet.owner.id === ownerId;
    });
  }
  // assignOwnerToPet : 동물 보호자 변경하기
  assignOwnerToPet(ownerId, petId) {
    const petIndexAtId = this.pets.findIndex((pet) => pet.id === petId);
    const ownerIndexAtId = this.owners.findIndex((pet) => pet.id === ownerId);
    if (petIndexAtId > -1 && ownerIndexAtId > -1) {
      this.pets[petIndexAtId].owner = this.owners[petIndexAtId];
    }
  }
}

export default PetOwnerStore;
