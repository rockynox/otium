export const getSnapshotAsObjectArray = <T>(snapshot: { val: any }): T[] => {
    return Object.entries(snapshot.val())
        .map(object => {
            const [id, objectWithoutId] = object as [string, T];
            return {...objectWithoutId, id} as T;
        });
};
