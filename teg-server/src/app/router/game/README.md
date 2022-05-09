Response Documentation
/game/:gameId

```json

{
    "id": "string",
    "alias": "string",
    "creator": {
        "alias": "string",
        "id": "string",
        "name": "string"
    },
    "creator_user": "string",
    "status": "Status",
    "nextPlayerId": "string" "| null",
    "maxPlayers": "number",
    "round": "number" "| null",
    "createdAt": "Date",
    "updatedAt": "Date",
    "players": "Player[]"
}
```