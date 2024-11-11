package types

// Movie represents the structure of a movie.
type Movie struct {
	ID          int     `json:"id"`
	Keywords    string  `json:"keywords"`
	Characters  string  `json:"characters"`
	Actors      string  `json:"actors"`
	Director    string  `json:"director"`
	Crew        string  `json:"crew"`
	Genres      string  `json:"genres"`
	Overview    string  `json:"overview"`
	Title       string  `json:"title"`
	ImdbId      string  `json:"imdb_id"`
	VoteAverage float64 `json:"vote_average"`
	PosterPath  string  `json:"poster_path"`
}

// MovieResponse represents the structure of a movie response.
type MovieResponse struct {
	ID          int     `json:"id"`
	Title       string  `json:"title"`
	Characters  string  `json:"characters"`
	Actors      string  `json:"actors"`
	Director    string  `json:"director"`
	Genres      string  `json:"genres"`
	ImdbId      string  `json:"imdb_id"`
	VoteAverage float64 `json:"vote_average"`
	PosterPath  string  `json:"poster_path"`
	Overview    string  `json:"overview"`
	Similarity  float64 `json:"similarity"`
}

// Response represents the structure of a response.
type Response struct {
	Error         string          `json:"error"`
	MovieResponse []MovieResponse `json:"movie_response"`
	TargetMovie   string          `json:"target_movie"`
}

// DATA TASK
type TaskType string

const (
	TaskNone     TaskType = ""
	TaskRecomend TaskType = "Recommend"
	TaskSearch   TaskType = "SearchQuery"
	TaskGet      TaskType = "GetNMovies"
	TaskFind     TaskType = "FindXMovie"
)

type TaskDistributed struct {
	Type TaskType `json:"type"`
	Data TaskData `json:"data"`
}

type TaskData struct {
	TaskRecomendations *TaskRecomendations `json:"recomendations,omitempty"`
	TaskSearch         *TaskMasterSearch   `json:"search,omitempty"`
	Quantity           int                 `json:"quantity"`
}

type TaskRecomendations struct {
	Title                 string              `json:"title"`
	TargetMovie Movie   `json:"movie"`
	Movies      []Movie `json:"movies"`
}

type TaskMasterSearch struct {
	Query  string  `json:"query"`
	Movies []Movie `json:"movies"`
}