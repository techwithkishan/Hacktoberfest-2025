import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Upload, Github, Zap, Target, ExternalLink, Code2, Loader2, AlertCircle, FileText, X } from "lucide-react";
import { geminiService, ProjectAnalysis } from "@/services/gemini";
import { githubService } from "@/services/github";
import { jobApiService, JobSearchParams } from "@/services/jobApi";
import { useToast } from "@/hooks/use-toast";

export const ProjectMatcher = () => {
  const [projectText, setProjectText] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [analysis, setAnalysis] = useState<ProjectAnalysis | null>(null);
  const [matchedJobs, setMatchedJobs] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [fileContent, setFileContent] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => {
      const validTypes = ['.txt', '.md', '.json', '.js', '.ts', '.py', '.java', '.cpp', '.c', '.html', '.css'];
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      return validTypes.includes(fileExtension) && file.size <= 5 * 1024 * 1024; // 5MB limit
    });

    if (validFiles.length !== files.length) {
      toast({
        title: "Invalid Files",
        description: "Some files were rejected. Only text files under 5MB are allowed.",
        variant: "destructive",
      });
    }

    setUploadedFiles(prev => [...prev, ...validFiles]);
    
    // Read file content
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setFileContent(prev => prev + `\n\n--- ${file.name} ---\n${content}`);
      };
      reader.readAsText(file);
    });
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    // Note: This is a simplified approach. In a real app, you'd want to track content per file
  };

  const handleAnalyze = async () => {
    if (!projectText.trim() && !githubUrl.trim() && !fileContent.trim()) {
      toast({
        title: "Error",
        description: "Please provide either a project description, GitHub URL, or upload files",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setShowResults(false);

    try {
      let projectDescription = projectText;

      // If GitHub URL is provided, fetch repository information
      if (githubUrl.trim()) {
        const repoMatch = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
        if (repoMatch) {
          const [, owner, repo] = repoMatch;
          const repoInfo = await githubService.getRepositoryInfo(owner, repo);
          projectDescription = `
            Repository: ${repoInfo.fullName}
            Description: ${repoInfo.description}
            Primary Language: ${repoInfo.language}
            Technologies: ${repoInfo.technologies.join(', ')}
            README: ${repoInfo.readme}
          `;
        }
      }

      // If files are uploaded, include their content
      if (fileContent.trim()) {
        projectDescription += `\n\nUploaded Files Content:\n${fileContent}`;
      }

      // Analyze project with Gemini
      const projectAnalysis = await geminiService.analyzeProject(projectDescription, githubUrl);
      setAnalysis(projectAnalysis);

      // Search for matching jobs
      const jobSearchParams: JobSearchParams = {
        skills: projectAnalysis.detectedSkills,
        limit: 20
      };

      const jobResponse = await jobApiService.searchJobs(jobSearchParams);
      
      // Match project to jobs using Gemini
      const jobMatches = await geminiService.matchProjectToJobs(projectAnalysis, jobResponse.jobs);
      
      // Combine job data with match scores
      const jobsWithMatches = jobResponse.jobs.map(job => {
        const match = jobMatches.find(m => m.jobId === job.id);
        return {
          ...job,
          matchScore: match?.matchScore || 0,
          matchingSkills: match?.matchingSkills || [],
          missingSkills: match?.missingSkills || [],
          reasoning: match?.reasoning || ''
        };
      }).sort((a, b) => b.matchScore - a.matchScore);

      setMatchedJobs(jobsWithMatches);
      setShowResults(true);
    } catch (error) {
      console.error('Analysis error:', error);
      setError(error instanceof Error ? error.message : 'Failed to analyze project');
      toast({
        title: "Analysis Error",
        description: error instanceof Error ? error.message : 'Failed to analyze project',
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section className="py-20 px-6 bg-gradient-subtle">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-secondary bg-clip-text text-transparent">
            Project to Career Matcher
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Transform your projects into career opportunities. Our AI analyzes your tech stack and matches you with relevant roles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Card className="glass p-6 shadow-elegant">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-primary-glow" />
                Project Details
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Project Description
                  </label>
                  <Textarea
                    placeholder="Describe your project, tech stack, features, and what you built..."
                    value={projectText}
                    onChange={(e) => setProjectText(e.target.value)}
                    className="min-h-32 bg-background/50 border-border resize-none"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    GitHub Repository URL
                  </label>
                  <div className="relative">
                    <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="https://github.com/username/repo"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      className="pl-10 bg-background/50 border-border"
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleAnalyze}
                  disabled={!projectText && !githubUrl || isAnalyzing}
                  variant="hero" 
                  className="w-full"
                >
                  {isAnalyzing ? (
                    <>
                      <Zap className="w-4 h-4 animate-pulse" />
                      Analyzing Project...
                    </>
                  ) : (
                    <>
                      <Target className="w-4 h-4" />
                      Analyze & Match
                    </>
                  )}
                </Button>
              </div>
            </Card>

            {/* File Upload */}
            <Card className="glass p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary-glow" />
                Upload Project Files
              </h3>
              
              <div className="space-y-4">
                <div
                  className="border-dashed border-2 border-border rounded-lg p-6 text-center hover:border-primary-glow/50 transition-smooth cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-1">
                    Click to upload project files
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supports: .txt, .md, .json, .js, .ts, .py, .java, .cpp, .c, .html, .css (max 5MB each)
                  </p>
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".txt,.md,.json,.js,.ts,.py,.java,.cpp,.c,.html,.css"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Uploaded Files:</p>
                    <div className="space-y-1">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-background/30 rounded p-2">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{file.name}</span>
                            <span className="text-xs text-muted-foreground">
                              ({(file.size / 1024).toFixed(1)} KB)
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {isAnalyzing ? (
              <Card className="glass p-12 text-center">
                <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary-glow" />
                <h3 className="text-lg font-semibold mb-2">Analyzing Your Project</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI is analyzing your project and finding matching career opportunities...
                </p>
              </Card>
            ) : error ? (
              <Card className="glass p-6 border-red-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <h3 className="text-lg font-semibold text-red-500">Analysis Error</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{error}</p>
                <Button onClick={handleAnalyze} variant="outline" size="sm">
                  Try Again
                </Button>
              </Card>
            ) : showResults && analysis ? (
              <>
                {/* Skills Analysis */}
                <Card className="glass p-6 shadow-elegant">
                  <h3 className="text-xl font-semibold mb-4">Skills Detected</h3>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Project Type:</span>
                      <span className="text-primary-glow font-medium">{analysis.projectType}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Complexity:</span>
                      <span className="text-accent-glow font-medium">{analysis.complexity}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Description:</span>
                      <span className="text-muted-foreground text-right max-w-xs">{analysis.description}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysis.technologies.map((tech) => (
                          <Badge key={tech} className="bg-primary-glow/20 text-primary-glow border-primary-glow/30">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Frameworks:</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysis.frameworks.map((framework) => (
                          <Badge key={framework} variant="outline" className="bg-accent-glow/10 text-accent-glow border-accent-glow/30">
                            {framework}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Matched Jobs */}
                <Card className="glass p-6 shadow-elegant">
                  <h3 className="text-xl font-semibold mb-4">Matching Job Opportunities</h3>
                  <div className="space-y-4">
                    {matchedJobs.length > 0 ? (
                      matchedJobs.slice(0, 5).map((job, index) => (
                        <div key={job.id} className="p-4 rounded-lg bg-background/30 border border-border">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-foreground">{job.title}</h4>
                            <div className="flex items-center gap-2">
                              <Badge 
                                variant="secondary" 
                                className={`
                                  ${job.matchScore >= 90 ? 'bg-green-500/20 text-green-400 border-green-500/30' : 
                                    job.matchScore >= 70 ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 
                                    'bg-orange-500/20 text-orange-400 border-orange-500/30'}
                                `}
                              >
                                {job.matchScore}% match
                              </Badge>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => job.external_url && window.open(job.external_url, '_blank')}
                              >
                                <ExternalLink className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="space-y-2 mb-3">
                            <p className="text-sm text-muted-foreground">
                              <strong>Company:</strong> {job.company} • <strong>Location:</strong> {job.location}
                            </p>
                            <p className="text-sm text-primary-glow font-medium">
                              {job.salary_display || 'Salary not specified'}
                            </p>
                          </div>

                          {job.matchingSkills.length > 0 && (
                            <div className="mb-2">
                              <p className="text-xs text-green-400 mb-1">Matching Skills:</p>
                              <div className="flex flex-wrap gap-1">
                                {job.matchingSkills.map((skill) => (
                                  <Badge key={skill} variant="outline" className="text-xs bg-green-500/10 text-green-400 border-green-500/30">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {job.reasoning && (
                            <p className="text-xs text-muted-foreground italic">
                              {job.reasoning}
                            </p>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No matching jobs found for your project</p>
                      </div>
                    )}
                  </div>
                </Card>
              </>
            ) : (
              <Card className="glass p-12 text-center border-dashed border-2 border-border">
                <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                  Ready to Analyze
                </h3>
                <p className="text-sm text-muted-foreground">
                  Add your project details to see AI-powered career matches
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};