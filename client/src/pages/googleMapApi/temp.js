// const Reroute = async () => {
//     const numofpoints = all.length;
//     const NumofPonitsToSTARTpoints = Math.ceil(numofpoints / 4 + 1);
  
//     for (let j = 0; j < numofpoints; j++) {
//       const newArray = [...newall];
//       newArray[j] = all[j];
//       setNewall(newArray);
//       const newdis = [...distancedest];
//       newdis[j] = 0;
//       setDistancedest(newdis);
  
//       for (let i = j + 1; i < numofpoints - 1; i++) {
//         const newArray = [...newall];
//         newArray[i] = all[i];
//         setNewall(newArray);
//         const newdis = [...distancedest];
//         newdis[i] = 0;
//         setDistancedest(newdis);
//       }
  
//       // Use useEffect to wait for the state updates to complete
//       useEffect(() => {
//         // Calculate the distances
//         for (let i = j + 1; i < numofpoints - 1; i++) {
//           const newdis = [...distancedest];
//           newdis[i] = await calculateDistance(all[j], all[i]);
//           console.log(newdis[i]);
//           setDistancedest(newdis);
//         }
  
//         // Sort the arrays
//         const { sortedPoints, sortedDistances } = sortByDistance(
//           newall,
//           distancedest
//         );
//         setAll(sortedPoints);
//         setDistancedest(sortedDistances);
//       }, [newall]);
//     }
  
//     console.log("Sorted Points:", all);
//     console.log("Sorted Distances:", distancedest);
//   };
  

// const REarrangeRoute=()={

//     const numofpoints = all.length;
//     const NumofPonitsToSTARTpoints = Math.ceil(numofpoints / 4 + 1);
//     for(int i=0;i<NumofPonitsToSTARTpoints;i++)
//     {
//         arr[i]=arrdest[i];
//     }
// }

// for (let j = 0; j < numofpoints; j++) {
//     newDistances[j]=all[j];
//     const newdis = [...distancedest];
//     newdis[j] = 0;
//     setDistancedest(newdis);

//     for (let i = j + 1; i < numofpoints; i++) {
//       const newArray = [...newall];
//       newArray[i] = all[i];
//       setNewall(newArray);
//       console.log("start  ", all[j]);
//       console.log("end  ", all[i]);
//       const distance = await calculateDistance(all[j],all[i]);
//       newDistances.push(distance);
//       console.log(newDistances);
//       setDistancedest(newDistances);
//       console.log(distancedest);
//     }
