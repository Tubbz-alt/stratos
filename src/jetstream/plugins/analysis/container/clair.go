package main

import (
	"fmt"
	"io/ioutil"
	"os"
	"os/exec"
	"path/filepath"
	"time"

	log "github.com/sirupsen/logrus"
)

func runClair(job *AnalysisJob) error {

	log.Debug("Running Clair job")

	job.Busy = true
	job.Type = "clair"
	job.Format = "clair"
	setJobNameAndPath(job, "Clair")

	scriptPath := filepath.Join(getScriptFolder(), "clair-runner.sh")
	args := []string{scriptPath, job.KuebConfigPath, job.Config.Namespace}
	log.Error(scriptPath)

	go func() {
		// Use our custom script which is a wrapper around kubescore
		cmd := exec.Command("bash", args...)
		cmd.Dir = job.Folder
		cmd.Env = make([]string, 0)
		cmd.Env = append(cmd.Env, fmt.Sprintf("KUBECONFIG=%s", job.KuebConfigPath))

		start := time.Now()
		out, err := cmd.Output()
		end := time.Now()

		log.Info("Completed running kube-score")
		log.Info(err)

		// Remove any config files when done
		job.RemoveTempFiles()

		job.Duration = int(end.Sub(start).Seconds())

		if err != nil {
			// There was an error
			// Remove the folder
			os.Remove(job.Folder)
			log.Error(">>>>>>>>> ERROR <<<<<<<<<")
			log.Error(string(out))
			log.Error(err)
			job.Status = "error"
		} else {
			reportFile := filepath.Join(job.Folder, "report.log")
			ioutil.WriteFile(reportFile, out, os.ModePerm)
			job.Status = "completed"
		}
	}()

	return nil
}
