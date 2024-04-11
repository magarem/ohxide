export default class UserService {
    getUsers() {
        return fetch('demo/data/users.json')
            .then((res) => res.json())
            .then((d) => d);
    }
}
